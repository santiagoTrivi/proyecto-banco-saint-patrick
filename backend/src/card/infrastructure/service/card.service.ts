import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from '../schemas/card.schema';
import { CardRepository } from '../../domain/interface/ICardRepository';
import { CardEntity } from '../../domain/Card.entity';

@Injectable()
export class CardService implements CardRepository {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<CardDocument>,
  ) {}

  async create(createCard: CardEntity): Promise<CardEntity> {
    const card = new this.cardModel(createCard);
    const savedCard = await card.save();
    return CardEntity.getcardEntity(savedCard);
  }

  async findAll(): Promise<CardEntity[]> {
    return await this.cardModel.find().select({ __v: 0 });
  }

  async findOne(query: any): Promise<CardEntity> {
    const card = await this.cardModel.findOne(query).select({ __v: 0 });

    if (!card) return null;

    return card.toObject();
  }
  async update(id: string, updateData: Partial<CardEntity>) {
    return await this.cardModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async findById(id: string): Promise<CardEntity> {
    const card = await this.cardModel.findById(id)

    if (!card) return null;

    return CardEntity.getcardEntity(card);
  }
}
