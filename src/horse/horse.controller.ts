import { Controller } from '@nestjs/common';
import { HorseService } from './horse.service';

@Controller('horse')
export class HorseController {
  constructor(private readonly horseService: HorseService) {}
}
