import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from './location.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [SequelizeModule.forFeature([Location]), FilesModule],
})
export class LocationModule {}
