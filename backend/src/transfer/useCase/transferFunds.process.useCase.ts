import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Card, CardDocument } from 'src/auth/domain/schemas/card.schema';
import { Transfer, TransferDocument } from '../domain/schemas/transfer.schema';
import { CreateTransferDto } from '../domain/dto/create-transfer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TransferService } from '../service/transfer.service';

@Injectable()
export class TransferFundsProcess {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<CardDocument>,
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<TransferDocument>,
  ) {}

  async run(createTransferDto: CreateTransferDto): Promise<Transfer> {
    const { sender, receiver, amount } = createTransferDto;
    const session = await this.cardModel.startSession();
    session.startTransaction();

    try {
      const transaction = { session };

      const foundSender = await this.cardModel
        .findById(sender)
        .session(session)
        .exec();

      if (foundSender.current_balance < amount) {
        throw new HttpException('NOT ENOUGH FUNDS', HttpStatus.BAD_REQUEST);
      }

      const FoundReceiver = await this.cardModel
        .findById(receiver)
        .session(session)
        .exec();

      if (!foundSender || !FoundReceiver)
        throw new HttpException('CARD NOT FOUND', HttpStatus.BAD_REQUEST);

      foundSender.current_balance -= amount;
      FoundReceiver.current_balance += amount;

      await foundSender.save(transaction);
      await FoundReceiver.save(transaction);

      const transfer = new this.transferModel({
        sender,
        receiver,
        amount,
      });

      const createdTransfer = await transfer.save(transaction);

      await session.commitTransaction();

      return createdTransfer;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
