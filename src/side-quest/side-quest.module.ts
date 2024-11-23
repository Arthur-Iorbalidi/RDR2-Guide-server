import { Module } from '@nestjs/common';
import { SideQuestService } from './side-quest.service';
import { SideQuestController } from './side-quest.controller';
import { SideQuest } from './side-quest.model';
import { Location } from 'src/location/location.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [SideQuestController],
  providers: [SideQuestService],
  imports: [SequelizeModule.forFeature([SideQuest, Location])]
})
export class SideQuestModule {}
