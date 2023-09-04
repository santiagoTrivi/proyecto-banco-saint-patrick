import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './infrastructure/service/transfer.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transfer,
  TransferSchema,
} from './infrastructure/schemas/transfer.schema';
import { Card, CardSchema } from '../card/infrastructure/schemas/card.schema';
import { FundsHandler } from './useCase/fundsHandler';
import { StartSession } from './useCase/startSession';
import { TransferFundsProcessHandler } from './useCase/transferFundProcessHandler';
import { TransferHandler } from './useCase/transferHandler';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transfer.name, schema: TransferSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  controllers: [TransferController],
  providers: [
    TransferService,
    FundsHandler,
    StartSession,
    TransferHandler,
    TransferFundsProcessHandler,
  ],
})
export class TransferModule {}
