import {
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
import { CardService } from 'src/card/infrastructure/service/card.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MovementDepositHandler {
  private dataCipher: DataCipher;

  constructor(
    private readonly startSession: StartSession,
    private readonly fundsHandlerService: FundsHandlerService,
    private readonly movementService: MovementService,
    private readonly cardService: CardService,
    @InjectConnection() private readonly connection: Connection
  ) {
    this.dataCipher = new DataCipher();
  }

  async run(createMovementDto: ICreateMovementDto) {
    const { cardId, PIN, amount, concept } = createMovementDto;
    const session = await this.connection.startSession()                               

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
        //await this.cardService.update(foundCard._id, {current_balance: + amount})
  
        const _cardId = foundCard._id;
        const currencyId = foundCard.currency._id.toString();
  
        const deposit = MovementDeposit.createNew({
          cardId: _cardId,
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
    } finally{
      await session.endSession();
    }
    
  }
}
