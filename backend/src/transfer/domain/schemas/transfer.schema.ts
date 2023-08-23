import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITransfer } from '../interface/Itransfer';
import { Card } from 'src/auth/domain/schemas/card.schema';
import mongoose, { Document, now } from 'mongoose';

export type TransferDocument = Transfer & Document;

@Schema({ timestamps: true })
export class Transfer implements ITransfer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true })
  sender: Card;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true })
  receiver: Card;

  @Prop()
  amount: number;

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
