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
import { CurrencyService } from '../currency/infrastructure/services/currency.service';
import { Currency, CurrencySchema } from '../currency/infrastructure/schemas/currency.schema';
import { DateHandler } from '../common/useCase/DateHandler';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movement.name, schema: MovementSchema },
      { name: Card.name, schema: CardSchema },
      { name: Currency.name, schema: CurrencySchema}
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
    CurrencyService,
    DateHandler
  ],
})
export class MovementModule {}
