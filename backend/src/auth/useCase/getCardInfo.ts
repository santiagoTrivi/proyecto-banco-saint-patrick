import { Injectable, NotFoundException } from '@nestjs/common';
import { CardService } from '../../card/infrastructure/service/card.service';

@Injectable()
export class GetCardInfo {
  constructor(private readonly cardService: CardService) {}

  run = async (_id: string) => {
    const card = await this.cardService.findOne({ _id });

    if (!card) throw new NotFoundException('CARD_NOT_FOUND');

    const { PIN, ...result } = card;

    return result;
  };
}
