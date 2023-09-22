import { ICreateMovementDeposit } from './interface/ICreateMovementDeposit';
import { IMovementBase } from './interface/IMovementBase';

export class MovementDeposit implements IMovementBase<'DEPOSIT'> {
  public _id: string;
  public cardId: string;
  public amount: number;
  public currencyId: string;
  public concept: string;
  public type: 'DEPOSIT';
  public createdAt: Date;
  public updatedAt: Date;

  constructor(objectData: IMovementBase<'DEPOSIT'>) {
    this._id = objectData._id;
    this.cardId = objectData.cardId;
    this.amount = objectData.amount;
    this.currencyId = objectData.currencyId;
    this.concept = objectData.concept;
    this.type = objectData.type;
    this.createdAt = objectData.createdAt;
    this.updatedAt = objectData.updatedAt;
  }

  static createNew(data: ICreateMovementDeposit) {
    return new MovementDeposit({
      _id: undefined,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
