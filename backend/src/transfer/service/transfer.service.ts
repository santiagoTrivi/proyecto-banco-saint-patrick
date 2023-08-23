import { Injectable } from '@nestjs/common';
import { ITransferRepository } from '../domain/interface/ItransferRepository';
import { Transfer, TransferDocument } from '../domain/schemas/transfer.schema';
import { CreateTransferDto } from '../domain/dto/create-transfer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransferService implements ITransferRepository<Transfer> {
  constructor(
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<TransferDocument>,
  ) {}

  getTransfer(id: string): Promise<Transfer> {
    throw new Error('Method not implemented.');
  }
  
  async getTansfers(): Promise<Transfer[]> {
    
    const globalMovements = await this.transferModel.find()
    .select({__v:0})
    .populate(
      [
        {path: 'senderId', select: {__v: 0}},
        {path: 'receiverId', select: {__v: 0}}
      ])

      return globalMovements
  }
  
  getTransferHistory(card: string): Promise<Transfer>[] {
    throw new Error('Method not implemented.');
  }
}
