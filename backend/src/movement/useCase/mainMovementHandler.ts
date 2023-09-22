import { Injectable } from '@nestjs/common';
import { MovementDepositHandler } from './movementDepositHandler';
import { MovementTransferenceHandler } from './movementTransferenceHandler';
import { ICreateMovementDto } from '../domain/interface/ICreateMovementDto';
import { MovementType } from '../domain/movementType';

@Injectable()
export class MainMovementHandler {
  constructor(
    private readonly movementDePositHandler: MovementDepositHandler,
    private readonly movementTransferenceHandler: MovementTransferenceHandler,
  ) {}

  execute = async (movement: ICreateMovementDto) => {
    if (movement.type === MovementType.DEPOSIT) {
      return await this.movementDePositHandler.run(movement);
    }

    if (movement.type === MovementType.TRANSFERENCE) {
      return await this.movementTransferenceHandler.run(movement);
    }
  };
}
