import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateWeaponDto {
  @IsString()
  name: string;

  @IsNumber()
  damage: number;

  @IsNumber()
  range: number;

  @IsNumber()
  reloadSpeed: number;

  @IsNumber()
  @IsOptional()
  firingRate?: number;

  @IsNumber()
  accuracy: number;

  @IsNumber()
  @IsOptional()
  ammo?: number;

  @IsNumber()
  @IsOptional()
  cost?: number;

  @IsBoolean()
  isUnique: boolean;

  @IsNumber()
  @IsOptional()
  locationId?: number;
}
