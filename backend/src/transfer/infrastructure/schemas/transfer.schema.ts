import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITransfer } from '../../domain/interface/Itransfer';
import { Card } from '../../../card/infrastructure/schemas/card.schema';
import { Client } from '../../../client/infrastructure/schemas/client.schema';
import mongoose, { Document, now } from 'mongoose';

export type TransferDocument = Transfer & Document;

@Schema({ timestamps: true })
export class Transfer implements ITransfer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
  clientId: Client;

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
