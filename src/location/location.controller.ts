import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createLocation(
    @Body() locationDto: CreateLocationDto,
    @UploadedFile() image?: any,
  ) {
    return this.locationService.create(locationDto, image);
  }

  @Get()
  async getAllLocations() {
    return this.locationService.getAll();
  }

  @Get(':id')
  async getLocationById(@Param('id') id: number) {
    return this.locationService.getById(id);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: number) {
    return this.locationService.delete(id);
  }
}
