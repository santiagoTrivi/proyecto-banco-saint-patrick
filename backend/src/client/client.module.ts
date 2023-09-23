import { Module } from '@nestjs/common';
import { ClientService } from './infrastructure/services/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './infrastructure/schemas/client.schema';
import { ClientController } from './client.controller';
import { AddCardProcess, RegisterCard } from '@card/usecase';
import { CardService } from '@card/infrastructure/service/card.service';
import { Card, CardSchema } from '@card/infrastructure/schemas/card.schema';
import { UpdateClientInfo } from './useCase/updateClientInfo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    RegisterCard,
    AddCardProcess,
    CardService,
    UpdateClientInfo,
  ],
  exports: [ClientService],
})
export class ClientModule {}
