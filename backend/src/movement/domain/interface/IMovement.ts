import { MovementDeposit } from '../MovementDeposit.Entity';
import { MovementTransference } from '../MovementTransference.Entity';

export type IMovement = MovementDeposit | MovementTransference;
