import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './infrastructure/service/transfer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transfer, TransferSchema } from './infrastructure/schemas/transfer.schema';
import { TransferFundsProcess } from './useCase/transferFunds.process.useCase';
import { Card, CardSchema } from '../auth/infrastructure/schemas/card.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transfer.name, schema: TransferSchema },
      { name: Card.name, schema: CardSchema },
    ]),

  ],
  controllers: [TransferController],
  providers: [TransferService, TransferFundsProcess, ],
})
export class TransferModule {} 
