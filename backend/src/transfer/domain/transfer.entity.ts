import { ITransfer } from './interface/Itransfer';

export class TransferEntity implements ITransfer {
  constructor(
    public _id: string,
    public clientId: any,
    public senderId: any,
    public receiverId: any,
    public amount: number,
    public currency: string,
    public concept: string,
    public createdAt?: any,
    public updatedAt?: any,
  ) {}
}
