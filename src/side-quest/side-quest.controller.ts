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
import { SideQuestService } from './side-quest.service';
import { CreateSideQuestDto } from './dto/create-sideQuest.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('side-quests')
export class SideQuestController {
  constructor(private readonly sideQuestService: SideQuestService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createSideQuest(
    @Body() createSideQuestDto: CreateSideQuestDto,
    @UploadedFile() image?: any,
  ) {
    return this.sideQuestService.create(createSideQuestDto, image);
  }

  @Get()
  async getAllSideQuests() {
    return this.sideQuestService.getAll();
  }

  @Get(':id')
  async getSideQuestById(@Param('id', ParseIntPipe) id: number) {
    return this.sideQuestService.getById(id);
  }

  @Delete(':id')
  async deleteSideQuest(@Param('id', ParseIntPipe) id: number) {
    return this.sideQuestService.delete(id);
  }
}
