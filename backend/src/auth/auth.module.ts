import { Module } from '@nestjs/common';
import { AuthService } from './use-case/auth.service';
import { AuthController } from './auth.controller';
import { ClientService } from './use-case/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginUseCase } from './use-case/login-useCase';
import { JWT_CONFIG } from 'src/config/jwt.cofig';
import { Client, ClientSchema } from './domain/schemas/client.schema';
import { Card, CardSchema } from './domain/schemas/card.schema';
import { JwtAuthGuard } from 'src/shared/auth.guard';
import { JwtStrategy } from 'src/shared/Auth.Stratergy';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Client.name, schema: ClientSchema},
      {name: Card.name, schema: CardSchema}
    ]),
    JWT_CONFIG()
  ],
  controllers: [AuthController],
  providers: [ClientService, AuthService, LoginUseCase, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
