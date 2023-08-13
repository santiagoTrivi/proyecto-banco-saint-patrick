import { Module } from '@nestjs/common';
import { CardService } from './services/card.service';
import { AuthController } from './auth.controller';
import { ClientService } from './services/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_CONFIG } from 'src/config/jwt.cofig';
import { Client, ClientSchema } from './domain/schemas/client.schema';
import { Card, CardSchema } from './domain/schemas/card.schema';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.Strategy';
import { GetCardInfo } from './useCase/getCardInfo';



@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Client.name, schema: ClientSchema},
      {name: Card.name, schema: CardSchema}
    ]),
    JWT_CONFIG()
  ],
  controllers: [AuthController],
  providers: [
    ClientService, 
    CardService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GetCardInfo
  ],
})
export class AuthModule {}
