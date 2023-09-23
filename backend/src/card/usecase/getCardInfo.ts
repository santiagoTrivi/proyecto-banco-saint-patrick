import { Injectable, NotFoundException } from '@nestjs/common';
import { CardService } from '../infrastructure/service/card.service';
import { ValidateObjectIdService } from '../../common/infrastructure/service/validMongoObjectId';

@Injectable()
export class GetCardInfo {
    private validateObjectIdService: ValidateObjectIdService;
  constructor(private readonly cardService: CardService) {
    this.validateObjectIdService = new ValidateObjectIdService();
  }

  run = async (_id: string) => {
    await this.validateObjectIdService.validate(_id);
    const card = await this.cardService.findOne({ _id });

    if (!card) throw new NotFoundException('CLIENT_NOT_FOUND');

    const { PIN, ...result } = card;

    return result;
  };
}
