import { Injectable } from '@nestjs/common';
import { ValidateObjectIdService } from '../../common/infrastructure/service/validMongoObjectId';
import { MovementService } from '../infrastructure/services/movement.service';
import { IPaginationOption } from '../../common/domain/interface/IpaginationOpstions';
import { DateHandler } from '../../common/useCase/DateHandler';

@Injectable()
export class GetMovementData {
  private validateObjectIdService: ValidateObjectIdService;
  private dateHandler: DateHandler;

  constructor(private readonly movementService: MovementService) {
    this.validateObjectIdService = new ValidateObjectIdService();
    this.dateHandler = new DateHandler();

  }

  async PaginationMovementByCard(
    cardId: string,
    paginationDto: IPaginationOption,
  ) {
    await this.validateObjectIdService.validate(cardId);
    
    let {from, until} = paginationDto;

    if(from && until){
      paginationDto.from = new Date(from)
      paginationDto.until = new Date(until)
    }else{
      paginationDto.from = this.dateHandler.firstDay();
      paginationDto.until = this.dateHandler.lastDay();
    }
    
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
