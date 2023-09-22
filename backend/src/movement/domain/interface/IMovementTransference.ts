import { IMovementBase } from './IMovementBase';

export interface IMovementTransference extends IMovementBase<'TRANSFERENCE'> {
  toCardId: string;
}
