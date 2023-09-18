import { BadRequestException, Injectable } from '@nestjs/common';
import { CardEntity } from '../../card/domain/Card.entity';
import { CreateEntity } from '../../common/domain/interface/ICreateEntity';
import { CreateCard } from '../../card/domain/interface/ICreateCard';
import { RegisterCard } from '../../card/usecase/registerCard';
import { ClientService } from '../infrastructure/services/client.service';
import { ValidateObjectIdService } from '../../common/infrastructure/service/validMongoObjectId';
import { ClientEntity } from '../domain/client.entity';

@Injectable()
export class AddCardProcess {
  private validMongoObjectId: ValidateObjectIdService;
  constructor(
    private readonly clientService: ClientService,
    private readonly registerCard: RegisterCard,
  ) {
    this.validMongoObjectId = new ValidateObjectIdService();
  }

  run = async (_clientId: string, PIN: string): Promise<void> => {
    const client = await this.validateAmountCard(_clientId);

    const newCard = await this.registerCard.run(_clientId, PIN);

    const cardId = newCard._id;
    const clientId = client._id;

    await this.clientService.addCard(clientId, cardId);
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
