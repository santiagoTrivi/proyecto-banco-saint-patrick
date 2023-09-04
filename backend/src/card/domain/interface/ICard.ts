export interface ICard {
  id?: any;
  card_number: string;
  PIN: string;
  current_balance: number;
  isActive?: boolean;
  refreshToken?: string;
}
