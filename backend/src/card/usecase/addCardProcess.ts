import { BadRequestException, Injectable } from '@nestjs/common';
import { CardEntity } from '../domain/Card.entity';
import { CreateCard } from '../domain/interface/ICreateCard';
import { RegisterCard } from './registerCard';
import { ValidateObjectIdService } from '@common/infrastructure/service/validMongoObjectId';
import { ClientService } from '@client/infrastructure/services/client.service';
import { ClientEntity } from '@client/domain/client.entity';


@Injectable()
export class AddCardProcess {
  private validMongoObjectId: ValidateObjectIdService;
  constructor(
    private readonly clientService: ClientService,
    private readonly registerCard: RegisterCard,
  ) {
    this.validMongoObjectId = new ValidateObjectIdService();
  }

  run = async (
    _clientId: string,
    createCard: CreateCard,
  ): Promise<CardEntity> => {
    const client = await this.validateAmountCard(_clientId);

    const newCard = await this.registerCard.run(_clientId, createCard);

    const cardId = newCard._id;
    const clientId = client._id;

    await this.clientService.addCard(clientId, cardId);

    return newCard;
  };

  private validateAmountCard = async (
    clientId: string,
  ): Promise<ClientEntity> => {
    await this.validMongoObjectId.validate(clientId);

    const client = await this.clientService.findById(clientId);

    const { cards } = client;

    if (cards.length === 3) {
      throw new BadRequestException('MAXIMUM_CARD_NUMBER_HAS_BEEN_REACHED');
    }

    return client;
  };
}
