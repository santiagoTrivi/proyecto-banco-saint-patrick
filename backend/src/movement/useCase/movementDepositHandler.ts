import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataCipher } from '../../common/useCase/dataCipher';
import { StartSession } from '../infrastructure/services/startSession.service';
import { MovementService } from '../infrastructure/services/movement.service';
import { ICreateMovementDto } from '../domain/interface/ICreateMovementDto';
import { MovementDeposit } from '../domain/MovementDeposit.Entity';
import { FundsHandlerService } from '../infrastructure/services/fundsHandler.service';
import { CardService } from '../../card/infrastructure/service/card.service';
import { CurrencyService } from '../../currency/infrastructure/services/currency.service';


@Injectable()
export class MovementDepositHandler {
  private dataCipher: DataCipher;

  constructor(
    private readonly startSession: StartSession,
    private readonly fundsHandlerService: FundsHandlerService,
    private readonly movementService: MovementService,
    private readonly cardService: CardService,
    private readonly currencyService: CurrencyService
  ) {
    this.dataCipher = new DataCipher();
  }

  async run(createMovementDto: ICreateMovementDto) {
    const { cardId, PIN, amount, concept } = createMovementDto;

    const session = await this.startSession.startSession();

    try {
      await session.startTransaction();

      const foundCard = await this.startSession.findOne(
        { _id: cardId },
        session,
      );

      if (!foundCard) {
        throw new NotFoundException(`CARD_NOT_FOUND`);
      }

      const PIN_VALIDATION = await this.dataCipher.compare(PIN, foundCard.PIN);

      if (!PIN_VALIDATION) throw new UnauthorizedException('WORNG PIN');

      await this.fundsHandlerService.add(foundCard, amount);


      const currency = await this.currencyService.findOne({code: foundCard.currency.code});
      const currencyId = currency._id;

      const deposit = MovementDeposit.createNew({
        cardId: foundCard._id,
        amount,
        currencyId,
        concept,
        type: 'DEPOSIT',
      });
      const createdDeposit = await this.movementService.create(deposit);

      await session.commitTransaction();

      return createdDeposit;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
