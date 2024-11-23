import { Module } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { WeaponController } from './weapon.controller';
import { Weapon } from './weapon.model';
import { Location } from 'src/location/location.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [WeaponController],
  providers: [WeaponService],
  imports: [SequelizeModule.forFeature([Weapon, Location])]
})
export class WeaponModule {}
