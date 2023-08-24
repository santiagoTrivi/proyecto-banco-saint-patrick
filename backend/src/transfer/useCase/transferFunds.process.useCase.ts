import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Card, CardDocument } from '../../auth/infrastructure/schemas/card.schema';
import { Transfer, TransferDocument } from '../infrastructure/schemas/transfer.schema';
import { CreateTransferDto } from '../infrastructure/dto/create-transfer.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransferFundsProcess {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<CardDocument>,
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<TransferDocument>,
  ) {}

  async run(createTransferDto: CreateTransferDto): Promise<Transfer> {
    const { senderId, receiver, amount, concept } = createTransferDto;
    const session = await this.cardModel.startSession();
    session.startTransaction();

    try {
      const transaction = { session };

      const foundSender = await this.cardModel
        .findById(senderId)
        .session(session)
        .exec();

      if (foundSender.current_balance < amount) {
        throw new HttpException('NOT ENOUGH FUNDS', HttpStatus.BAD_REQUEST);
      }

      const foundReceiver = await this.cardModel
        .findOne({card_number: receiver})
        .session(session)
        .exec();

      if (!foundSender || !foundReceiver)
        throw new HttpException('CARD NOT FOUND', HttpStatus.BAD_REQUEST);

      foundSender.current_balance -= amount;
      foundReceiver.current_balance += amount;

      await foundSender.save(transaction);
      await foundReceiver.save(transaction);

      const transfer = new this.transferModel({
        senderId,
        receiverId: foundReceiver._id,
        amount,
        concept
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
