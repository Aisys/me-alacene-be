import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipes, RecipesSchema } from './recipes.schema';
import { CupboardsService } from 'src/cupboards/cupboards.service';
import { CupboardsModule } from 'src/cupboards/cupboards.module';

@Module({
  providers: [RecipesService],
  controllers: [RecipesController],
  imports: [
    MongooseModule.forFeature([{ name: Recipes.name, schema: RecipesSchema }]),
    CupboardsModule
  ],
})
export class RecipesModule {}