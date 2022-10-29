import {
  Body, Controller, Delete, Get, Param, Post, Put
} from '@nestjs/common';
import { CreateDto, UpdateDto } from './recipes.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly service: RecipesService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get('cupboardId/:id')
  async getByCupboardId(@Param('id') id) {
    return await this.service.findAllByCupboardId(id);
  }

  /* @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.service.create(createTodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.service.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  } */

}