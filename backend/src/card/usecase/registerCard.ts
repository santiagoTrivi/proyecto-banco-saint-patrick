import { CardEntity } from '../domain/Card.entity';
import { CardService } from '../infrastructure/service/card.service';
import { CreateCard } from '../domain/interface/ICreateCard';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataCipher } from '@common/useCase/dataCipher';
import { CardNumberGenerator } from '@common/useCase/cardNumberGenerator';

@Injectable()
export class RegisterCard {
  private dataCipher: DataCipher;
  private cardNumberGenerator: CardNumberGenerator;
  constructor(private readonly cardService: CardService) {
    this.dataCipher = new DataCipher();
    this.cardNumberGenerator = new CardNumberGenerator();
  }

  run = async (
    clinetId: string,
    createCard: CreateCard,
  ): Promise<CardEntity> => {
    const { PIN, currencyId } = createCard;
    const hashedPin = await this.dataCipher.hash(PIN);
    const card_number = await this.cardNumberGenerator.run();

    const foundCard = await this.cardService.findOne({ card_number });

    if (foundCard) throw new BadRequestException('SOMETHIG_WENT_WRONG');

    const newCard = new CardEntity(
      undefined,
      clinetId,
      card_number,
      hashedPin,
      0,
      currencyId,
    );

    const createdCard = await this.cardService.create(newCard);

    return createdCard;
  };
}
