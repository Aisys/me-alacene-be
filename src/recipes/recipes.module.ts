import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipes, RecipesSchema } from './recipes.schema';

@Module({
  providers: [RecipesService],
  controllers: [RecipesController],
  imports: [
    MongooseModule.forFeature([{ name: Recipes.name, schema: RecipesSchema }]),
  ],
})
export class RecipesModule {}