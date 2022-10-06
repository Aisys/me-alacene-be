import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type IngredientsTypesDocument = IngredientsTypes & Document;

@Schema()
export class IngredientsTypes {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
}

export const IngredientsTypesSchema = SchemaFactory.createForClass(IngredientsTypes);
