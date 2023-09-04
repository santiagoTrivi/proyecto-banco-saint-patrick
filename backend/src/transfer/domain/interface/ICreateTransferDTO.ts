export interface ICreateTransferDTO {
  clientId: string;
  sender_card: string;
  receiver_card: string;
  amount: number;
  concept: string;
  PIN?: string;
}
