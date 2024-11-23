import { Module } from '@nestjs/common';
import { HorseService } from './horse.service';
import { HorseController } from './horse.controller';
import { Horse } from './horse.model';
import { Handling } from 'src/handling/handling.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [HorseController],
  providers: [HorseService],
  imports: [SequelizeModule.forFeature([Horse, Handling])]
})
export class HorseModule {}
