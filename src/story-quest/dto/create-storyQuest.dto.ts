import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStoryQuestDto {
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  reward?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  locationId?: number;
}
