import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
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
}

export const CardSchema = SchemaFactory.createForClass(Card);
