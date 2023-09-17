import { Injectable, NotFoundException } from '@nestjs/common';
import { IStartSession } from '../../../common/domain/interface/IStartSession';
import { InjectModel } from '@nestjs/mongoose';
import {
  Card,
  CardDocument,
} from '../../../card/infrastructure/schemas/card.schema';
import { ClientSession, Model } from 'mongoose';

@Injectable()
export class StartSession implements IStartSession {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
  ) {}
  startSession(): Promise<ClientSession> {
    return this.cardModel.startSession();
  }
  async findOne(
    card_number: string,
    session: ClientSession,
  ): Promise<CardDocument> {
    const found = await this.cardModel
      .findOne({ card_number })
      .session(session)
      .exec();

    if (!found) throw new NotFoundException(`NOT_FOUND: ${card_number}`);

    return found;
  }
}
