import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Card } from '../../../card/infrastructure/schemas/card.schema';
import mongoose, { Document, now } from 'mongoose';
import { Currency } from '../../../currency/infrastructure/schemas/currency.schema';
import {
  MovemenTypeValue,
  MovementType,
} from '../../../movement/domain/movementType';

export type MovementDocument = Movement & Document;

@Schema()
export class Movement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true })
  cardId: Card;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: false })
  toCardId: Card;

  @Prop()
  amount: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
    required: true,
  })
  currencyId: Currency;

  @Prop()
  concept: string;

  @Prop({ type: String, enum: Object.values(MovementType) })
  type: MovementType;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
