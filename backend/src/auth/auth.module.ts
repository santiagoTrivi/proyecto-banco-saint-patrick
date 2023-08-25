import { Module } from '@nestjs/common';
import { CardService } from './infrastructure/services/card.service';
import { AuthController } from './auth.controller';
import { ClientService } from './infrastructure/services/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './infrastructure/schemas/client.schema';
import { Card, CardSchema } from './infrastructure/schemas/card.schema';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { AuthService } from './infrastructure/services/auth.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.Strategy';
import { GetCardInfo } from './useCase/getCardInfo';
import { RefreshTokenStrategy } from './infrastructure/strategies/refresh.jwt.strategy';
import { JWT_CONFIG } from '../config/jwt.cofig';

// JWT_CONFIG is the function to retrieve json web token configuration


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: Card.name, schema: CardSchema },
    ]),
    JWT_CONFIG(),
  ],
  controllers: [AuthController],
  providers: [
    ClientService,
    CardService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    GetCardInfo,
  ],
})
export class AuthModule {}
