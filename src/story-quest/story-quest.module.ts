import { Module } from '@nestjs/common';
import { StoryQuestService } from './story-quest.service';
import { StoryQuestController } from './story-quest.controller';
import { StoryQuest } from './story-quest.model';
import { Location } from 'src/location/location.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [StoryQuestController],
  providers: [StoryQuestService],
  imports: [SequelizeModule.forFeature([StoryQuest, Location])]
})
export class StoryQuestModule {}
