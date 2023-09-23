import mongoose, { Document, now } from 'mongoose';
import { ICurrency } from '../../domain/interface/ICurrency';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CurrencyDocument = Currency & Document;

@Schema()
export class Currency implements ICurrency {
  @Prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  symbol: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop()
  flag_link: string;

  @Prop({ default: now() })
  createdAt?: Date;

  @Prop({ default: now() })
  updatedAt?: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
