import { CardDocument } from 'src/card/infrastructure/schemas/card.schema';
import { IbalanceUpdater } from '../domain/interface/IbalanceUpdates';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FundsHandler implements IbalanceUpdater {
  subtract(
    card: CardDocument,
    amount: number,
    transaction: any,
  ): Promise<CardDocument> {
    card.current_balance -= amount;
    return card.save(transaction);
  }
  add(
    card: CardDocument,
    amount: number,
    transaction: any,
  ): Promise<CardDocument> {
    card.current_balance += amount;
    return card.save(transaction);
  }
}
