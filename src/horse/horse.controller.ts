import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HorseService } from './horse.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateHorseDto } from './dto/create-horse.dto';

@Controller('horses')
export class HorseController {
  constructor(private readonly horseService: HorseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createHorse(
    @Body() createHorseDto: CreateHorseDto,
    @UploadedFile() image?: any,
  ) {
    return this.horseService.create(createHorseDto, image);
  }

  @Get()
  async getAllHorses() {
    return this.horseService.getAll();
  }

  @Get(':id')
  async getHorseById(@Param('id', ParseIntPipe) id: number) {
    return this.horseService.getById(id);
  }

  @Delete(':id')
  async deleteHorse(@Param('id', ParseIntPipe) id: number) {
    return this.horseService.delete(id);
  }
}
