import { CurrencyEntity } from '../../currency/domain/currencyEntity';
import { ICard } from './interface/ICard';

export class CardEntity implements ICard {
  constructor(
    public _id: string,
    public clientId: string,
    public card_number: string,
    public PIN: string,
    public current_balance: number,
    public currency?: any,
    public isActive?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static getcardEntity(data: any): CardEntity {
    const {
      _id,
      clientId,
      card_number,
      PIN,
      current_balance,
      currency,
      isActive,
      createdAt,
      updatedAt,
    } = data;

    return new CardEntity(
      _id,
      clientId,
      card_number,
      PIN,
      current_balance,
      currency,
      isActive,
      createdAt,
      updatedAt,
    );
  }
}
