import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidateObjectIdService } from '../../common/infrastructure/service/validMongoObjectId';
import { MovementService } from '../infrastructure/services/movement.service';
import { IPaginationOption } from '../../common/domain/interface/IpaginationOpstions';

@Injectable()
export class GetMovementData {
  private validateObjectIdService: ValidateObjectIdService;

  constructor(private readonly movementService: MovementService) {
    this.validateObjectIdService = new ValidateObjectIdService();
  }

  async PoaginationMovementByCard(
    cardId: string,
    paginationDto: IPaginationOption,
  ) {
    await this.validateObjectIdService.validate(cardId);

    return await this.movementService.getMovementHistory(cardId, paginationDto);
  }

  async MovementDetails(transferId: string) {
    await this.validateObjectIdService.validate(transferId);
    /*
    const foundMovement = await this.movementService.geMovement({
      _id: transferId,
    });

    if (!foundMovement) {
      throw new NotFoundException('TRANSFER_NOT_FOUND');
    }

    return foundTransfer;
    */
  }
}
