import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorseDto } from './dto/create-horse.dto';
import { Horse } from './horse.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Location } from 'src/location/location.model';
import { Handling } from 'src/handling/handling.model';

@Injectable()
export class HorseService {
  constructor(
    @InjectModel(Horse) private horseRepository: typeof Horse,
    private readonly fileService: FilesService,
  ) {}

  async create(dto: CreateHorseDto, image?: any): Promise<Horse> {
    let fileName: string | null = null;

    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    const horse = await this.horseRepository.create({
      ...dto,
      image: fileName,
    });

    return horse;
  }

  async getAll() {
    const horses = await this.horseRepository.findAll({
      include: [Handling, Location],
    });

    return {
      data: horses,
    };
  }

  async getById(id: number): Promise<Horse> {
    const horse = await this.horseRepository.findByPk(id, {
      include: [Location, Handling],
    });

    if (!horse) {
      throw new NotFoundException(`Horse with id ${id} not found`);
    }

    return horse;
  }

  async delete(id: number): Promise<void> {
    const horse = await this.getById(id);

    if (horse.image) {
      this.fileService.deleteImage(horse.image);
    }

    await horse.destroy();
  }
}
