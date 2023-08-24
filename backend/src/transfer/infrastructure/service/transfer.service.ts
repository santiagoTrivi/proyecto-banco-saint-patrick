import { Injectable } from '@nestjs/common';
import { ITransferRepository } from '../../domain/interface/ItransferRepository';
import { Transfer, TransferDocument } from '../schemas/transfer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationService } from '../../../common/infrastructure/service/pagination-service.service';
import { PaginationDto } from '../../../common/infrastructure/dto/Pagination.dto';




@Injectable()
export class TransferService implements ITransferRepository<Transfer> {
  private paginationService: PaginationService<TransferDocument>
  constructor(
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<TransferDocument>,

  ) {
    this.paginationService = new PaginationService(this.transferModel)
  }

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
  
  async getTransferHistory(cardId: string, paginationDto: PaginationDto) {

    return await this.paginationService.paginate({$or: [{ senderId: cardId }, { receiverId: cardId }]}, paginationDto);
    
  }
}
