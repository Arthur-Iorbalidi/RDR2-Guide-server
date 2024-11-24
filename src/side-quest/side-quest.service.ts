import { Injectable, NotFoundException } from '@nestjs/common';
import { SideQuest } from './side-quest.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateSideQuestDto } from './dto/create-sideQuest.dto';
import { Location } from 'src/location/location.model';

@Injectable()
export class SideQuestService {
  constructor(
    @InjectModel(SideQuest) private sideQuestRepository: typeof SideQuest,
    private readonly fileService: FilesService,
  ) {}

  async create(dto: CreateSideQuestDto, image?: any): Promise<SideQuest> {
    let fileName: string | null = null;

    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    const sideQuest = await this.sideQuestRepository.create({
      ...dto,
      image: fileName,
    });

    return sideQuest;
  }

  async getAll(): Promise<SideQuest[]> {
    return this.sideQuestRepository.findAll();
  }

  async getById(id: number): Promise<SideQuest> {
    const sideQuest = await this.sideQuestRepository.findByPk(id, {
      include: [Location],
    });

    if (!sideQuest) {
      throw new NotFoundException(`Side Quest with id ${id} not found`);
    }

    return sideQuest;
  }

  async delete(id: number): Promise<void> {
    const sideQuest = await this.getById(id);

    if (sideQuest.image) {
      this.fileService.deleteImage(sideQuest.image);
    }

    await sideQuest.destroy();
  }
}
