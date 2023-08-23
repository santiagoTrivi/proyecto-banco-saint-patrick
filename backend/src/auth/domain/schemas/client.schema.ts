import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IClient } from '../interface/IClient';
import { Card } from './card.schema';

export type ClientDocument = Client & Document;

@Schema()
export class Client implements IClient {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }] })
  cards?: Card[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
