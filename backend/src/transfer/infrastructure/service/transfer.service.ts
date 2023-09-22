import { Injectable } from '@nestjs/common';
import { ITransferRepository } from '../../domain/interface/ItransferRepository';
import { Transfer, TransferDocument } from '../schemas/transfer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationService } from '../../../common/infrastructure/service/pagination-service.service';
import { PaginationDto } from '../../../common/infrastructure/dto/Pagination.dto';
import { TransferEntity } from '../../domain/transfer.entity';

@Injectable()
export class TransferService implements ITransferRepository<TransferEntity> {
  private paginationService: PaginationService<TransferDocument>;
  constructor(
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<TransferDocument>,
  ) {
    this.paginationService = new PaginationService(this.transferModel);
  }

  async getTransfer(query: any): Promise<TransferEntity> {
    const ExceptionData = {
      __v: 0,
      _id: 0,
      PIN: 0,
      current_balance: 0,
      clientId: 0,
      currency: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    const foundTranfer: TransferEntity = await this.transferModel
      .findOne(query)
      .select({ __v: 0 })
      .populate([
        {
          path: 'senderId',
          select: ExceptionData,
        },
        {
          path: 'receiverId',
          select: ExceptionData,
        },
      ])
      .exec();
    return foundTranfer;
  }

  async getTansfers(): Promise<TransferEntity[]> {
    const globalMovements = await this.transferModel
      .find()
      .select({ __v: 0 })
      .populate([
        {
          path: 'senderId',
          select: { __v: 0, _id: 0, PIN: 0, current_balance: 0 },
        },
        {
          path: 'receiverId',
          select: { __v: 0, _id: 0, PIN: 0, current_balance: 0 },
        },
      ]);

    return globalMovements;
  }

  async getTransferHistory(cardId: string, paginationDto: PaginationDto) {
    return;
    //this.paginationService.paginate({ $or: [{ senderId: cardId }, { receiverId: cardId }] },paginationDto);
  }
}
