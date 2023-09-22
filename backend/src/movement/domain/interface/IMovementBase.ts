import { MovemenTypeValue } from '../movementType';

export interface IMovementBase<Type extends MovemenTypeValue> {
  _id: string;
  cardId: string;
  amount: number;
  currencyId: string;
  concept: string;
  type: Type;
  createdAt?: Date;
  updatedAt?: Date;
}
