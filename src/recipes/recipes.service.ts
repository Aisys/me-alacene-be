import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipes, RecipesDocument } from './recipes.schema';
import { CreateDto, UpdateDto } from './recipes.dto';
import { CupboardsService } from 'src/cupboards/cupboards.service';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipes.name) private readonly model: Model<RecipesDocument>,
    private cupboardService: CupboardsService
  ) {}

  async findAllByCupboardId(idUser): Promise<Recipes[]> {

    const userIngredients = await this.cupboardService.findAllByUserOnlyName(idUser).then(resp => resp);

    const mappedUserIngredients = userIngredients.map(resp => resp.ingredient);
    console.log(mappedUserIngredients)

    const aggregate = [
      {
        $unwind: {
          path: '$ingredients',
        },
      },
      {
        $lookup: {
          from: 'ingredients',
          let: { searchId: { $toObjectId: '$ingredients.ingredient' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', { $toObjectId: '$$searchId' }] },
              },
            },
          ],
          as: 'ingredients.ingredient',
        },
      },
      {
        $unwind: {
          path: '$ingredients.ingredient',
        },
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            description: '$description',
            cookingTimeMin: '$cookingTimeMin',
            portions: '$portions',
            steps: '$steps',
          },
          ingredients: { $push: '$ingredients' },
        },
      },
      {
        $match: {
          'ingredients.ingredient.name': { $in: mappedUserIngredients }
        },
      }
    ];

    return await this.model.aggregate(aggregate).exec();
  }

  async findAll(): Promise<Recipes[]> {
    const aggregate = [
      {
        $unwind: {
          path: '$ingredients',
        },
      },
      {
        $lookup: {
          from: 'ingredients',
          let: { searchId: { $toObjectId: '$ingredients.ingredient' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', { $toObjectId: '$$searchId' }] },
              },
            },
          ],
          as: 'ingredients.ingredient',
        },
      },
      {
        $unwind: {
          path: '$ingredients.ingredient',
        },
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            description: '$description',
            cookingTimeMin: '$cookingTimeMin',
            portions: '$portions',
            steps: '$steps',
          },
          ingredients: { $push: '$ingredients' },
        },
      },
      // {
      //   $match: {
      //     $expr: { $eq: ['$_id', { $toObjectId: idUser }] },
      //   },
      // }
      // { $skip: 6 },
      // { $limit : 2 }
    ];
    return await this.model.aggregate(aggregate).exec();
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
