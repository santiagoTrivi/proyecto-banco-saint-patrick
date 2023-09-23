import { Inject, Injectable } from '@nestjs/common';
import { CurrencyEntity } from '../../domain/currencyEntity';
import { CurrencyReposipty } from '../../domain/interface/ICurrencyRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Currency, CurrencyDocument } from '../schemas/currency.schema';
import { Model } from 'mongoose';

@Injectable()
export class CurrencyService implements CurrencyReposipty {
  constructor(
    @InjectModel(Currency.name)
    private readonly currencyModel: Model<CurrencyDocument>,
  ) {}

  async create(create: CurrencyEntity): Promise<CurrencyEntity> {
    const currency = new this.currencyModel(create);
    const savedCurrency = await currency.save();
    return CurrencyEntity.getCurrencyEntity(savedCurrency);
  }
  async findAll(): Promise<CurrencyEntity[]> {
    return await this.currencyModel.find().select({ __v: 0 }).lean().exec();
  }
  async findOne(query: any): Promise<CurrencyEntity | null> {
    const currency = await this.currencyModel
      .findOne(query)
      .select({ __v: 0 })
      .lean()
      .exec();

    if (!currency) return null;

    return CurrencyEntity.getCurrencyEntity(currency);
  }
  async findById(id: string): Promise<CurrencyEntity | null> {
    return await this.currencyModel.findById(id);
  }

  async update(id: string, updateData: Partial<CurrencyEntity>) {
    return await this.currencyModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
