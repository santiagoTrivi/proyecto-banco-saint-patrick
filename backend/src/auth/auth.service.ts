import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { Card, CardDocument } from './schemas/card.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashSync, genSaltSync } from 'bcrypt';



@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<CardDocument> 
  ){}

  async create(createCardDto: CreateCardDto) {

    const checkCard = await this.cardModel.findOne({card_number: createCardDto.card_number});

    if(checkCard) throw new HttpException('CARD_NUMBER ALREADY EXISTS', HttpStatus.UNAUTHORIZED)

    const card = new Card();
    const salt = genSaltSync();

    card.card_number = createCardDto.card_number;
    card.PIN = hashSync(createCardDto.PIN, salt);
    card.current_balance = createCardDto.current_balance;
    card.client = createCardDto.client;

    return await this.cardModel.create(card);

  }

  async findAll() {

    return await this.cardModel
    .find()
    .select({__v: 0})
    .populate({path: 'client', select: {__v: 0}})

  }

  async findByCardNumber(card_number: string) {
    const card = await this.cardModel.findOne({card_number})
    .select({__v: 0})
    .populate({path: 'client', select: {__v: 0}})

    return card.toObject();
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
