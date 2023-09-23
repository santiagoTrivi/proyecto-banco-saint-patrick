import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';
import { IClient } from '../../domain/interface/IClient';
import { Card } from '../../../card/infrastructure/schemas/card.schema';

export type ClientDocument = Client & Document;

@Schema()
export class Client implements IClient {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }] })
  cards?: Card[];

  @Prop()
  refreshToken?: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
