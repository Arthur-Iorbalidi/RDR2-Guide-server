import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { Weapon } from './weapon.model';
import { Location } from 'src/location/location.model';

@Injectable()
export class WeaponService {
  constructor(
    @InjectModel(Weapon) private weaponRepository: typeof Weapon,
    private readonly fileService: FilesService,
  ) {}

  async create(dto: CreateWeaponDto, image?: any): Promise<Weapon> {
    let fileName: string | null = null;

    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    const weapon = await this.weaponRepository.create({
      ...dto,
      image: fileName,
    });

    return weapon;
  }

  async getAll() {
    const weapons = await this.weaponRepository.findAll();
    return {
      data: weapons,
    };
  }

  async getById(id: number): Promise<Weapon> {
    const weapon = await this.weaponRepository.findByPk(id, {
      include: [Location],
    });

    if (!weapon) {
      throw new NotFoundException(`Weapon with id ${id} not found`);
    }

    return weapon;
  }

  async delete(id: number): Promise<void> {
    const weapon = await this.getById(id);

    if (weapon.image) {
      this.fileService.deleteImage(weapon.image);
    }

    await weapon.destroy();
  }
}
