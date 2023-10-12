import { Injectable } from '@nestjs/common';
import { ValidateObjectIdService } from '../../common/infrastructure/service/validMongoObjectId';
import { MovementService } from '../infrastructure/services/movement.service';
import { IPaginationOption } from '../../common/domain/interface/IpaginationOpstions';
import * as moment from 'moment';

@Injectable()
export class GetMovementData {
  private validateObjectIdService: ValidateObjectIdService;

  constructor(private readonly movementService: MovementService) {
    this.validateObjectIdService = new ValidateObjectIdService();
  }

  async PaginationMovementByCard(
    cardId: string,
    paginationDto: IPaginationOption,
  ) {
    await this.validateObjectIdService.validate(cardId);

    let {from, until} = paginationDto;

    if(from && until){
      paginationDto.from = moment(from, 'YYYY/MM/DD').toDate();
      paginationDto.until = moment(until,'YYYY/MM/DD').toDate();
    }else{
      paginationDto.from = moment().startOf('month').toDate();
      paginationDto.until = moment().endOf('month').toDate();
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
