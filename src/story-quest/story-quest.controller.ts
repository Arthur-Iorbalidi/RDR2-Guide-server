import { Controller } from '@nestjs/common';
import { StoryQuestService } from './story-quest.service';

@Controller('story-quest')
export class StoryQuestController {
  constructor(private readonly storyQuestService: StoryQuestService) {}
}
