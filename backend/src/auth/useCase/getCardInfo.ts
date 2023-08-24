import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardService } from '../infrastructure/services/card.service';

@Injectable()
export class GetCardInfo {
  constructor(private readonly cardService: CardService) {}

  run = async (_id: string) => {
    const card = await this.cardService.findOne({ _id });

    if (!card) throw new HttpException('CARD_NOT_FOUND', HttpStatus.NOT_FOUND);

    const { PIN, ...result } = card;

    return result;
  };
}
