import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/me-alacene'),

    IngredientsModule,
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
