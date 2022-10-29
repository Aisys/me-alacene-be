import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cupboards, CupboardsDocument } from './cupboards.schema';
import { CreateDto, UpdateDto } from './cupboards.dto';

@Injectable()
export class CupboardsService {
  constructor(
    @InjectModel(Cupboards.name)
    private readonly model: Model<CupboardsDocument>,
  ) {}

  async findAll(): Promise<Cupboards[]> {
    return await this.model.find().exec();
  }

  async findAllByUserOnlyName(idUser): Promise<any[]> {
    let aggregate = [
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
        $match: {
          $expr: { $eq: ['$_id', { $toObjectId: idUser }] },
        },
      },
      {
        $project: {
          ingredient: '$ingredients.ingredient.name'
        }
      }
    ];
    return await this.model.aggregate(aggregate).exec();
  }

  async findAllByUser(idUser): Promise<any[]> {
    let aggregate = [
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
        $match: {
          $expr: { $eq: ['$_id', { $toObjectId: idUser }] },
        },
      },
    ];
    return await this.model.aggregate(aggregate).exec();
  }

  async findOne(id: string): Promise<Cupboards> {
    return await this.model.findById(id).exec();
  }

  async create(createCupboardsDto: CreateDto): Promise<Cupboards> {
    return await new this.model({
      ...createCupboardsDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateCupboardsDto: UpdateDto): Promise<Cupboards> {
    return await this.model.findByIdAndUpdate(id, updateCupboardsDto).exec();
  }

  async delete(id: string): Promise<Cupboards> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
