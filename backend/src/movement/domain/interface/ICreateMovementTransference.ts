import { IMovementBase } from './IMovementBase';
import { IMovementTransference } from './IMovementTransference';

export type ICreateMovementTransference = Omit<
  IMovementTransference,
  '_id' | 'createdAt' | 'updatedAt'
>;
