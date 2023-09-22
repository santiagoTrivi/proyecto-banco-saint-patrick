import { CardDocument } from 'src/card/infrastructure/schemas/card.schema';
import { IbalanceUpdater } from '../../../common/domain/interface/IbalanceUpdates';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FundsHandlerService implements IbalanceUpdater {
  subtract(card: CardDocument, amount: number): Promise<CardDocument> {
    card.current_balance -= amount;
    return card.save();
  }
  add(card: CardDocument, amount: number): Promise<CardDocument> {
    card.current_balance += amount;
    return card.save();
  }
}
