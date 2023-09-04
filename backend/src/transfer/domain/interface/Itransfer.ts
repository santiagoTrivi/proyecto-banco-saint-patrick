export interface ITransfer {
  id?: string;
  clientId: any;
  senderId: any;
  receiverId: any;
  amount: number;
  currency?: string;
  concept: string;
  createdAt?: any;
  updatedAt?: any;
}
