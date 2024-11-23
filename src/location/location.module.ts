import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from './location.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [SequelizeModule.forFeature([Location])]
})
export class LocationModule {}
