import { Injectable, NotFoundException } from '@nestjs/common';
import { IStartSession } from '../../../common/domain/interface/IStartSession';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  Card,
  CardDocument,
} from '../../../card/infrastructure/schemas/card.schema';
import { ClientSession, Connection, Model } from 'mongoose';

@Injectable()
export class StartSession implements IStartSession {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    @InjectConnection() private readonly connection: Connection
  ) {}
  async startSession(): Promise<ClientSession> {
    return await this.connection.startSession();
  }
  async findOne(
    query: any,
    session: ClientSession,
  ): Promise<CardDocument> {
    const found = await this.cardModel
      .findOne(query)
      .populate({path: 'currency'})
      .session(session)
      .exec();

    if (!found) return null;

    return found;
  }
}
