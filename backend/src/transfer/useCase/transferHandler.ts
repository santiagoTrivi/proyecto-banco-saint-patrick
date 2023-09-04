import { Injectable } from '@nestjs/common';
import { ItransferHandler } from '../domain/interface/ITransferHandler';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transfer,
  TransferDocument,
} from '../infrastructure/schemas/transfer.schema';
import { ClientSession, Model } from 'mongoose';
import { ITransfer } from '../domain/interface/Itransfer';

@Injectable()
export class TransferHandler implements ItransferHandler {
  constructor(
    @InjectModel(Transfer.name)
    private readonly TransferModel: Model<TransferDocument>,
  ) {}

  async create(
    createTransfer: ITransfer,
    transaction: { session: ClientSession },
  ) {
    const { clientId, senderId, receiverId, amount, concept } = createTransfer;

    const createdTransfer = new this.TransferModel({
      clientId,
      senderId,
      receiverId,
      amount,
      concept,
    });

    return await createdTransfer.save(transaction);
  }
}
