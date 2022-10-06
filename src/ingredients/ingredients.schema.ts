import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { IngredientsTypes } from '../ingredients-types/ingredients-types.schema';

export type IngredientsDocument = Ingredients & Document;

@Schema()
export class Ingredients {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  ref_calories: number;
  @Prop({ required: true })
  ref_quantity: number;
  @Prop({ required: true })
  ref_dimensional: string; // PENDIENTE?
  @Prop({ required: true })
  ref_price: number;

  @Prop({ required: true })
  perishable: boolean;
  @Prop({ required: true })
  storage_indications: string;
  @Prop({ required: true })
  ref_discard_after: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ingredients-types' })
  ingredient_type: IngredientsTypes;

  expiration_date: Date;
  quantity: number;
}

export const IngredientsSchema = SchemaFactory.createForClass(Ingredients);
