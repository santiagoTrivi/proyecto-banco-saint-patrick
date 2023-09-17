import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';
import { ICard } from '../../domain/interface/ICard';

export type CardDocument = Card & Document;

@Schema()
export class Card implements ICard {
  @Prop()
  card_number: string;

  @Prop()
  PIN: string;

  @Prop()
  current_balance: number;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
