import { IMovementBase } from './IMovementBase';

export type ICreateMovementDeposit = Omit<
  IMovementBase<'DEPOSIT'>,
  '_id' | 'createdAt' | 'updatedAt'
>;
