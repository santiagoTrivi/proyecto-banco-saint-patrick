import { ICard } from './interface/ICard';

export class CardEntity implements ICard {
  constructor(
    public _id: string,
    public card_number: string,
    public PIN: string,
    public current_balance: number,
    public isActive?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static getcardEntity(data: any): CardEntity {
    const {_id, card_number, PIN, current_balance, isActive, createdAt, updatedAt} = data;

    return new CardEntity(_id, card_number, PIN, current_balance, isActive, createdAt, updatedAt)
  }
}
