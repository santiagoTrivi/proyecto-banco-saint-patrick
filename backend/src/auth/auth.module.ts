import { Module } from '@nestjs/common';
import { CardService } from './infrastructure/services/card.service';
import { AuthController } from './auth.controller';
import { ClientService } from './infrastructure/services/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_CONFIG } from 'src/config/jwt.cofig';
import { Client, ClientSchema } from './infrastructure/schemas/client.schema';
import { Card, CardSchema } from './infrastructure/schemas/card.schema';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { AuthService } from './infrastructure/services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt.Strategy';
import { GetCardInfo } from './useCase/getCardInfo';
import { RefreshTokenStrategy } from './infrastructure/strategies/refresh.jwt.strategy';

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
