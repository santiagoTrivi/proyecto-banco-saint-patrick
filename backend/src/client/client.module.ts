import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './infrastructure/services/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './infrastructure/schemas/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name:  Client.name, schema: ClientSchema}
    ])
  ],
  controllers: [ClientController],
  providers:[
    ClientService
  ]
})
export class ClientModule {}
