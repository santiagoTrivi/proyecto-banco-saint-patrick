import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Movement,
  MovementSchema,
} from './infrastructure/schema/movement.schema';
import { MovementController } from './movement.controller';
import { StartSession } from './infrastructure/services/startSession.service';
import { MovementService } from './infrastructure/services/movement.service';
import { FundsHandlerService } from './infrastructure/services/fundsHandler.service';
import { Card, CardSchema } from '../card/infrastructure/schemas/card.schema';
import { MovementDepositHandler } from './useCase/movementDepositHandler';
import { MovementTransferenceHandler } from './useCase/movementTransferenceHandler';
import { MainMovementHandler } from './useCase/mainMovementHandler';
import { CardService } from '../card/infrastructure/service/card.service';
import { GetMovementData } from './useCase/getMovementData';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  controllers: [MovementController],
  providers: [
    CardService,
    StartSession,
    MovementService,
    FundsHandlerService,
    MovementDepositHandler,
    MovementTransferenceHandler,
    MainMovementHandler,
    GetMovementData,
  ],
})
export class MovementModule {}
