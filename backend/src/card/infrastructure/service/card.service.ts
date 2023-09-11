import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from '../../../auth/infrastructure/dto/create-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashSync, genSaltSync } from 'bcrypt';
import { Card, CardDocument } from '../schemas/card.schema';
import { UpdateCardDto } from '../Dto/update-card.dto';
import { CardRepository } from '../../domain/interface/ICardRepository';
import { CardEntity } from '../../domain/Card.entity';

@Injectable()
export class CardService implements CardRepository {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<CardDocument>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const checkCard = await this.cardModel.findOne({
      card_number: createCardDto.card_number,
    });

    if (checkCard)
      throw new HttpException(
        'CARD_NUMBER ALREADY EXISTS',
        HttpStatus.UNAUTHORIZED,
      );

    const card = new Card();
    const salt = genSaltSync();

    card.card_number = createCardDto.card_number;
    card.PIN = hashSync(createCardDto.PIN, salt);
    card.current_balance = createCardDto.current_balance;

    return await this.cardModel.create(card);
  }

  async findAll(): Promise<CardEntity[]> {
    return await this.cardModel.find().select({ __v: 0 });
  }

  async findOne(query: any): Promise<CardEntity> {
    const card = await this.cardModel.findOne(query).select({ __v: 0 });

    if (!card) return null;

    return card.toObject();
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    return await this.cardModel
      .findByIdAndUpdate(id, updateCardDto, { new: true })
      .exec();
  }

  async findById(id: string): Promise<CardEntity> {
    const card = await this.findById(id);

    if (!card) return null;

    return card;
  }
}
