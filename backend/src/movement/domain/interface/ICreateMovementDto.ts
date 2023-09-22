import { IMovementBase } from './IMovementBase';

export interface ICreateMovementDto {
  cardId: string;
  toCard?: string;
  amount: number;
  concept: string;
  type: string;
  PIN: string;
}
