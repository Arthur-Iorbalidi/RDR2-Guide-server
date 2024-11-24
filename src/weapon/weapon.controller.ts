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
import { WeaponService } from './weapon.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateWeaponDto } from './dto/create-weapon.dto';

@Controller('weapons')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createWeapon(
    @Body() createWeaponDto: CreateWeaponDto,
    @UploadedFile() image?: any,
  ) {
    return this.weaponService.create(createWeaponDto, image);
  }

  @Get()
  async getAllWeapons() {
    return this.weaponService.getAll();
  }

  @Get(':id')
  async getWeaponById(@Param('id', ParseIntPipe) id: number) {
    return this.weaponService.getById(id);
  }

  @Delete(':id')
  async deleteWeapon(@Param('id', ParseIntPipe) id: number) {
    return this.weaponService.delete(id);
  }
}
