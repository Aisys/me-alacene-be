import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredients, IngredientsDocument } from './ingredients.schema';
import { CreateDto, UpdateDto } from './ingredients.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredients.name)
    private readonly model: Model<IngredientsDocument>,
  ) {}

  async findAll(): Promise<Ingredients[]> {
    const aggregate = [
      {
        $lookup: {
          from: 'ingredients-types',
          let: { searchId: { $toObjectId: '$ingredient_type' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', { $toObjectId: '$$searchId' }] },
              },
            },
          ],
          as: 'ingredient_type',
        },
      },
    ];
    return await this.model.aggregate(aggregate).exec();
  }

  async findOne(id: string): Promise<Ingredients> {
    return await this.model.findById(id).exec();
  }

  async create(createIngredientsDto: CreateDto): Promise<Ingredients> {
    return await new this.model({
      ...createIngredientsDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateIngredientsDto: UpdateDto,
  ): Promise<Ingredients> {
    return await this.model.findByIdAndUpdate(id, updateIngredientsDto).exec();
  }

  async delete(id: string): Promise<Ingredients> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
