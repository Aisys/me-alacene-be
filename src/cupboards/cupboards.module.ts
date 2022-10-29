import { Module } from '@nestjs/common';
import { CupboardsService } from './cupboards.service';
import { CupboardsController } from './cupboards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cupboards, CupboardsSchema } from './cupboards.schema';

@Module({
  providers: [CupboardsService],
  controllers: [CupboardsController],
  imports: [
    MongooseModule.forFeature([{ name: Cupboards.name, schema: CupboardsSchema }]),
  ],
  exports: [CupboardsService]
})
export class CupboardsModule {}