import {
  Body, Controller, Delete, Get, Param, Post, Put
} from '@nestjs/common';
import { CreateDto, UpdateDto } from './cupboards.dto';
import { CupboardsService } from './cupboards.service';

@Controller('cupboards')
export class CupboardsController {
  constructor(private readonly service: CupboardsService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get('user/:id')
  async getById(@Param('id') id) {
    return await this.service.findAllByUser(id);
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