import { CreateEntity } from '../../common/domain/interface/ICreateEntity';
import { CardEntity } from '../domain/Card.entity';
import { DataCipher } from '../../common/useCase/dataCipher';
import { CardService } from '../infrastructure/service/card.service';
import { CreateCard } from '../domain/interface/ICreateCard';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CardNumberGenerator } from '../../common/useCase/cardNumberGenerator';

@Injectable()
export class RegisterCard {
  private dataCipher: DataCipher;
  private cardNumberGenerator: CardNumberGenerator;
  constructor(private readonly cardService: CardService) {
    this.dataCipher = new DataCipher();
    this.cardNumberGenerator = new CardNumberGenerator();
  }

  run = async (clinetId: string, PIN: string): Promise<CardEntity> => {
    const hashedPin = await this.dataCipher.hash(PIN);
    const card_number = await this.cardNumberGenerator.run();

    const foundCard = await this.cardService.findOne({ card_number });

    if (foundCard) throw new BadRequestException('SOMETHIG_WENT_WRONG');

    const newCard = new CardEntity(undefined, clinetId, card_number, hashedPin, 0);

    const createdCard = await this.cardService.create(newCard);

    return createdCard;
  };
}
