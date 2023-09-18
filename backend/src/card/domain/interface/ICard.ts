export interface ICard {
  _id?: any;
  clientId: any;
  card_number: string;
  PIN: string;
  current_balance: number;
  currency?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
