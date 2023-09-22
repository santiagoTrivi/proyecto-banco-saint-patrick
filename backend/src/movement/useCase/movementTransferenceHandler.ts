import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataCipher } from '../../common/useCase/dataCipher';
import { StartSession } from '../infrastructure/services/StartSession.service';
import { MovementService } from '../infrastructure/services/movement.service';
import { ICreateMovementDto } from '../domain/interface/ICreateMovementDto';
import { MovementDeposit } from '../domain/MovementDeposit.Entity';
import { FundsHandlerService } from '../infrastructure/services/fundsHandler.service';
import { MovementTransference } from '../domain/MovementTransference.Entity';

@Injectable()
export class MovementTransferenceHandler {
  private dataCipher: DataCipher;

  constructor(
    private readonly startSession: StartSession,
    private readonly fundsHandlerService: FundsHandlerService,
    private readonly movementService: MovementService,
  ) {
    this.dataCipher = new DataCipher();
  }

  async run(createMovementDto: ICreateMovementDto) {
    const { cardId, toCard, PIN, amount, concept } = createMovementDto;

    const session = await this.startSession.startSession();
    
    try {
      await session.startTransaction();
    

      const foundCard = await this.startSession.findOne(
        { _id: cardId },
        session,
      );
      const _tocard = await this.startSession.findOne(
        { card_number: toCard },
        session,
      );

      if (!foundCard) {
        throw new NotFoundException(`CARD_NOT_FOUND`);
      }

      if (!_tocard) {
        throw new NotFoundException(`INVALID_CARD_NUMBER`);
      }

      if (foundCard.current_balance < amount) {
        throw new BadRequestException('NOT_ENOUGH_FUNDS');
      }

      if (foundCard.currency._id.toString() !== _tocard.currency._id.toString()) {
        throw new BadRequestException('CURRENCY_DOES_NOT_MATCH');
      }

      const PIN_VALIDATION = await this.dataCipher.compare(PIN, foundCard.PIN);

      if (!PIN_VALIDATION) throw new UnauthorizedException('INCORRECT_PIN');

      await this.fundsHandlerService.subtract(foundCard, amount);
      await this.fundsHandlerService.add(_tocard, amount);

      const _cardId = foundCard._id;
      const tocardId = _tocard._id;
      const currencyId = foundCard.currency._id.toString();

      const transference = MovementTransference.createNew({
        cardId: _cardId,
        toCardId: tocardId,
        amount,
        currencyId,
        concept,
        type: 'TRANSFERENCE',
      });

      const createdDeposit = await this.movementService.create(
        transference
      );
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
