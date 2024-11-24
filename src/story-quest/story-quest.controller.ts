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
import { StoryQuestService } from './story-quest.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStoryQuestDto } from './dto/create-storyQuest.dto';

@Controller('story-quests')
export class StoryQuestController {
  constructor(private readonly storyQuestService: StoryQuestService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createStoryQuest(
    @Body() createStoryQuestDto: CreateStoryQuestDto,
    @UploadedFile() image?: any,
  ) {
    return this.storyQuestService.create(createStoryQuestDto, image);
  }

  @Get()
  async getAllStoryQuests() {
    return this.storyQuestService.getAll();
  }

  @Get(':id')
  async getStoryQuestById(@Param('id', ParseIntPipe) id: number) {
    return this.storyQuestService.getById(id);
  }

  @Delete(':id')
  async deleteStoryQuest(@Param('id', ParseIntPipe) id: number) {
    return this.storyQuestService.delete(id);
  }
}
