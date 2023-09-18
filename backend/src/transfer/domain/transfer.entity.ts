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
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static getTransferEntity(data: any): TransferEntity {
    const {
      _id,
      clientId,
      senderId,
      receiverId,
      amount,
      currency,
      concept,
      createdAt,
      updatedAt,
    } = data;

    return new TransferEntity(
      _id,
      clientId,
      senderId,
      receiverId,
      amount,
      currency,
      concept,
      createdAt,
      updatedAt,
    );
  }
}
