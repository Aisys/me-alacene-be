import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredients, IngredientsSchema } from './ingredients.schema';

@Module({
  providers: [IngredientsService],
  controllers: [IngredientsController],
  imports: [
    MongooseModule.forFeature([{ name: Ingredients.name, schema: IngredientsSchema }]),
  ],
})
export class IngredientsModule {}