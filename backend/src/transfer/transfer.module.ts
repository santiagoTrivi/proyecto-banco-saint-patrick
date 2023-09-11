import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './infrastructure/service/transfer.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transfer,
  TransferSchema,
} from './infrastructure/schemas/transfer.schema';
import { Card, CardSchema } from '../card/infrastructure/schemas/card.schema';
import {
  FundsHandler,
  GetTransferData,
  StartSession,
  TransferFundsProcessHandler,
  TransferHandler,
} from './useCase';

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
    GetTransferData,
  ],
})
export class TransferModule {}
