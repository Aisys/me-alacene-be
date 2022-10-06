import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';

export type CupboardsDocument = Cupboards & Document;

@Schema()
export class Cupboards {
  @Prop({ required: true })
  user: string;
  @Prop({ required: true })
  ingredients: any[];
}

export const CupboardsSchema = SchemaFactory.createForClass(Cupboards);
