import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientService } from '../client/infrastructure/services/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Client,
  ClientSchema,
} from '../client/infrastructure/schemas/client.schema';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { AuthService } from './infrastructure/services/auth.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.Strategy';
import { RefreshTokenStrategy } from './infrastructure/strategies/refresh.jwt.strategy';
import { JWT_CONFIG } from '../config/jwt.cofig';
import { GetClientInfo } from './useCase/getClientInfo';
import { RegisterClient } from './useCase/registerClient';

// JWT_CONFIG is the function to retrieve json web token configuration

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    JWT_CONFIG(),
  ],
  controllers: [AuthController],
  providers: [
    ClientService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    GetClientInfo,
    RegisterClient,
  ],
})
export class AuthModule {}
