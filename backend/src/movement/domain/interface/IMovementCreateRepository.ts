import { IMovement } from './IMovement';

export interface MovementCreateRepository<T> {
  create(createMovement: IMovement, transaction: any);
}
