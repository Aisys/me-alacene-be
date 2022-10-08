import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipesDocument = Recipes & Document;

@Schema()
export class Recipes {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  cookingTimeMin: number;
  @Prop({ required: true })
  portions: number;
  @Prop({ required: true })
  steps: [];
  @Prop({ required: true })
  ingredients: [];
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
