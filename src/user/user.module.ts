import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from 'src/auth/auth.module';
import { Weapon } from 'src/weapon/weapon.model';
import { UserWeapon } from 'src/user_weapon/user_weapon.model';
import { Horse } from 'src/horse/horse.model';
import { UserHorse } from 'src/user_horse/user_horse.model';
import { StoryQuest } from 'src/story-quest/story-quest.model';
import { UserStoryQuest } from 'src/user_story-quest/user_story-quest.model';
import { SideQuest } from 'src/side-quest/side-quest.model';
import { UserSideQuest } from 'src/user_side-quest/user_side-quest.model';
import { WeaponModule } from 'src/weapon/weapon.module';
import { HorseModule } from 'src/horse/horse.module';
import { StoryQuestModule } from 'src/story-quest/story-quest.module';
import { SideQuestModule } from 'src/side-quest/side-quest.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Weapon,
      UserWeapon,
      Horse,
      UserHorse,
      StoryQuest,
      UserStoryQuest,
      SideQuest,
      UserSideQuest,
    ]),
    forwardRef(() => AuthModule),
    WeaponModule,
    HorseModule,
    StoryQuestModule,
    SideQuestModule,
  ],
  exports: [UserService],
})
export class UserModule {}
