import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITransfer } from '../../domain/interface/Itransfer';
import { Card } from '../../../auth/infrastructure/schemas/card.schema';
import mongoose, { Document, now } from 'mongoose';

export type TransferDocument = Transfer & Document;

@Schema({ timestamps: true })
export class Transfer implements ITransfer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true })
  senderId: Card;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true })
  receiverId: Card;

  @Prop()
  amount: number;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop()
  concept: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);

function Field(
  arg0: () => DateConstructor,
  arg1: { description: string },
): (target: Transfer, propertyKey: 'createdAt') => void {
  throw new Error('Function not implemented.');
}
