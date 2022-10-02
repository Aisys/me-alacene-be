import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipes, RecipesDocument } from './recipes.schema';
import { CreateDto, UpdateDto } from './dto/base.dto';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipes.name) private readonly model: Model<RecipesDocument>) {}

  async findAll(): Promise<Recipes[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Recipes> {
    return await this.model.findById(id).exec();
  }

  async create(createRecipesDto: CreateDto): Promise<Recipes> {
    return await new this.model({
      ...createRecipesDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateRecipesDto: UpdateDto): Promise<Recipes> {
    return await this.model.findByIdAndUpdate(id, updateRecipesDto).exec();
  }

  async delete(id: string): Promise<Recipes> {
    return await this.model.findByIdAndDelete(id).exec();
  }

}