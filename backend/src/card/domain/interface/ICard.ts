export interface ICard {
  _id?: any;
  card_number: string;
  PIN: string;
  current_balance: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
