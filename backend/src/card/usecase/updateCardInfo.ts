import { DataCipher } from '../../common/useCase/dataCipher';
import { IDataCipher } from '../../common/domain/interface/IDataCipher';
import { UpdateEntityData } from '../../common/domain/interface/IupdateEntityData';
import { ValidateObjectIdService } from '../../common/infrastructure/service/validMongoObjectId';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CardService } from '../infrastructure/service/card.service';
import { CardEntity } from '../domain/Card.entity';
import { IUpdateCard } from '../domain/interface/IUpdateCard';

@Injectable()
export class UpdateCardtInfo implements UpdateEntityData<IUpdateCard> {
  private dataCipher: IDataCipher;
  private validateObjectIdService: ValidateObjectIdService;

  constructor(private readonly cardService: CardService) {
    this.dataCipher = new DataCipher();
    this.validateObjectIdService = new ValidateObjectIdService();
  }

  update = async (id: string, dataToUpdata: IUpdateCard) => {
    await this.validateObjectIdService.validate(id);
    const dataCardToUpdate: Partial<CardEntity> = {};
    const card = await this.cardService.findById(id);

    try {
      if (!card) {
        throw new NotFoundException('CARD_NOT_FOUND');
      }
      const _cardId = card._id;

      if (dataToUpdata.newPIN) {
        dataCardToUpdate.PIN = await this.changePassword(dataToUpdata, card);
      }

      dataCardToUpdate.updatedAt = new Date();
      await this.cardService.update(_cardId, dataCardToUpdate);
    } catch (error) {
      throw error;
    }
  };

  private changePassword = async (
    dataToUpdata: IUpdateCard,
    cardEntity: CardEntity,
  ): Promise<string> => {
    const { currentPIN, newPIN, confirmPIN } = dataToUpdata;

    if (newPIN !== confirmPIN) {
      throw new UnauthorizedException('PIN_NOT_CONFIRMED');
    }
    const currentHashedPIN = cardEntity.PIN;

    const IS_THE_SANE_PIN = await this.dataCipher.compare(
      currentPIN,
      currentHashedPIN,
    );

    if (!IS_THE_SANE_PIN) {
      throw new UnauthorizedException('INCORRECT_PIN');
    }

    return await this.dataCipher.hash(newPIN);
  };
}
