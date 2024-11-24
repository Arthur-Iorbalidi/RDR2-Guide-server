import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSideQuestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  reward: string;

  @IsString()
  questGiver: string;

  @IsBoolean()
  isMissable: boolean;

  @IsOptional()
  @IsString()
  missableChapter?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  locationId?: number;
}
