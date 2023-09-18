import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { StartSession } from '../infrastructure/service/startSession';
import { FundsHandler } from './fundsHandler';
import { TransferHandler } from './transferHandler';
import { CreateTransferDto } from '../infrastructure/dto/create-transfer.dto';
import { DataCipher } from '../../common/useCase/dataCipher';
import { TransferEntity } from '../domain/transfer.entity';

@Injectable()
export class TransferFundsProcessHandler {
  private dataCipher: DataCipher;

  constructor(
    private readonly startSession: StartSession,
    private readonly fundsHandler: FundsHandler,
    private readonly transferHandler: TransferHandler,
  ) {
    this.dataCipher = new DataCipher();
  }

  async run(createTransferDto: CreateTransferDto): Promise<TransferEntity> {
    const { clientId, sender_card, receiver_card, amount, concept, PIN } =
      createTransferDto;
    const session = await this.startSession.startSession();
    session.startTransaction();

    try {
      const transaction = { session };

      const foundSender = await this.startSession.findOne(sender_card, session);
      const foundReceiver = await this.startSession.findOne(
        receiver_card,
        session,
      );

      if (foundSender.current_balance < amount) {
        throw new BadRequestException('NOT ENOUGH FUNDS');
      }

      const PIN_VALIDATION = await this.dataCipher.compare(
        PIN,
        foundSender.PIN,
      );

      if (!PIN_VALIDATION) throw new UnauthorizedException('WORNG PIN');

      await this.fundsHandler.subtract(foundSender, amount, transaction);
      await this.fundsHandler.add(foundReceiver, amount, transaction);

      const senderId = foundSender._id;
      const receiverId = foundReceiver._id;

      const createdTransfer = await this.transferHandler.create(
        {
          clientId,
          senderId,
          receiverId,
          amount,
          concept,
        },
        transaction,
      );

      await session.commitTransaction();

      return TransferEntity.getTransferEntity(createdTransfer);
    } catch (error) {
      await session.abortTransaction();

      throw error;
    } finally {
      session.endSession();
    }
  }
}
