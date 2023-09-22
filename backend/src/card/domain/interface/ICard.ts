export interface ICard {
  _id?: any;
  clientId: any;
  card_number: string;
  PIN: string;
  current_balance: number;
  currency?: any;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
