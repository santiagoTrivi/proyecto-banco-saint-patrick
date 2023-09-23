import { CardService } from '@card/infrastructure/service/card.service';
import { Injectable, NotFoundException } from '@nestjs/common';

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
