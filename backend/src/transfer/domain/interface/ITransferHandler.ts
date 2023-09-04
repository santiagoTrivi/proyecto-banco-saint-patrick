import { ITransfer } from './Itransfer';

export interface ItransferHandler {
  create(createTransfer: ITransfer, transaction: any);
}
