import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHorseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  health: number;

  @IsNotEmpty()
  @IsNumber()
  stamina: number;

  @IsNotEmpty()
  @IsNumber()
  speed: number;

  @IsNotEmpty()
  @IsNumber()
  accelerarion: number;

  @IsNotEmpty()
  @IsNumber()
  handlingId: number;

  @IsOptional()
  @IsNumber()
  locationId?: number;
}
