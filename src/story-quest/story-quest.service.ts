import { Injectable, NotFoundException } from '@nestjs/common';
import { StoryQuest } from './story-quest.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateStoryQuestDto } from './dto/create-storyQuest.dto';
import { Location } from 'src/location/location.model';

@Injectable()
export class StoryQuestService {
  constructor(
    @InjectModel(StoryQuest) private storyQuestRepository: typeof StoryQuest,
    private readonly fileService: FilesService,
  ) {}

  async create(dto: CreateStoryQuestDto, image?: any): Promise<StoryQuest> {
    let fileName: string | null = null;

    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    const storyQuest = await this.storyQuestRepository.create({
      ...dto,
      image: fileName,
    });

    return storyQuest;
  }

  async getAll() {
    const storyQuests = await this.storyQuestRepository.findAll();

    return {
      data: storyQuests,
    };
  }

  async getById(id: number): Promise<StoryQuest> {
    const storyQuest = await this.storyQuestRepository.findByPk(id, {
      include: [Location],
    });

    if (!storyQuest) {
      throw new NotFoundException(`Side Quest with id ${id} not found`);
    }

    return storyQuest;
  }

  async delete(id: number): Promise<void> {
    const storyQuest = await this.getById(id);

    if (storyQuest.image) {
      this.fileService.deleteImage(storyQuest.image);
    }

    await storyQuest.destroy();
  }
}
