import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';
import { ICard } from '../../domain/interface/ICard';
import { Client } from '../../../client/infrastructure/schemas/client.schema';

export type CardDocument = Card & Document;

@Schema()
export class Card implements ICard {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
  clientId: Client;

  @Prop()
  card_number: string;

  @Prop()
  PIN: string;

  @Prop()
  current_balance: number;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
