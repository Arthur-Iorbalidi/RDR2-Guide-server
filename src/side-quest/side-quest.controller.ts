import { Controller } from '@nestjs/common';
import { SideQuestService } from './side-quest.service';

@Controller('side-quest')
export class SideQuestController {
  constructor(private readonly sideQuestService: SideQuestService) {}
}
