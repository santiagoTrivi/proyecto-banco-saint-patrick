import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientService } from './client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';
import { Card, CardSchema } from './schemas/card.schema';
import { LoginUseCase } from './use-case/login-useCase';
import { JWT_CONFIG } from 'src/config/jwt.cofig';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Client.name, schema: ClientSchema},
      {name: Card.name, schema: CardSchema}
    ]),
    JWT_CONFIG()
  ],
  controllers: [AuthController],
  providers: [ClientService, AuthService, LoginUseCase],
})
export class AuthModule {}
