import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './infrastructure/schemas/card.schema';
import { CardService } from './infrastructure/service/card.service';
import { RegisterCard } from './usecase/registerCard';
import { CardController } from './card.controller';
import { AddCardProcess } from './usecase/addCardProcess';
import {
  Client,
  ClientSchema,
} from '../client/infrastructure/schemas/client.schema';
import { ClientService } from '../client/infrastructure/services/client.service';
import { UpdateCardtInfo } from './usecase/updateCardInfo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [CardController],
  providers: [
    CardService,
    RegisterCard,
    AddCardProcess,
    ClientService,
    UpdateCardtInfo,
  ],
  exports: [CardService, RegisterCard],
})
export class CardModule {}
