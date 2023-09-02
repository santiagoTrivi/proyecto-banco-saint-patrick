import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from '../../../client/infrastructure/schemas/client.schema';
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client: Client;

  @Prop()
  refreshToken?: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
