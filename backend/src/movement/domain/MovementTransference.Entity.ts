import { ICreateMovementTransference } from './interface/ICreateMovementTransference';
import { IMovementBase } from './interface/IMovementBase';
import { IMovementTransference } from './interface/IMovementTransference';

export class MovementTransference implements IMovementTransference {
  public _id: string;
  public cardId: string;
  public toCardId: string;
  public amount: number;
  public currencyId: string;
  public concept: string;
  public type: 'TRANSFERENCE';
  public createdAt: Date;
  public updatedAt: Date;

  constructor(objectData: IMovementTransference) {
    this._id = objectData._id;
    this.cardId = objectData.cardId;
    this.toCardId = objectData.toCardId;
    this.amount = objectData.amount;
    this.currencyId = objectData.currencyId;
    this.concept = objectData.concept;
    this.type = objectData.type;
    this.createdAt = objectData.createdAt;
    this.updatedAt = objectData.updatedAt;
  }

  static createNew(data: ICreateMovementTransference) {
    return new MovementTransference({
      _id: undefined,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
