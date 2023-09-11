import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidateObjectIdService } from '../../common/infrastructure/service/validMongoObjectId';
import { TransferService } from '../infrastructure/service/transfer.service';

@Injectable()
export class GetTransferData {
  private validateObjectIdService: ValidateObjectIdService;

  constructor(private readonly TransferService: TransferService) {
    this.validateObjectIdService = new ValidateObjectIdService();
  }

  async transfersByCard(cardId: string, paginationDto: any) {
    await this.validateObjectIdService.validate(cardId);

    return await this.TransferService.getTransferHistory(cardId, paginationDto);
  }

  async transferDetails(transferId: string) {
    await this.validateObjectIdService.validate(transferId);

    const foundTransfer = await this.TransferService.getTransfer({
      _id: transferId,
    });

    if (!foundTransfer) {
      throw new NotFoundException('TRANSFER_NOT_FOUND');
    }

    return foundTransfer;
  }
}
