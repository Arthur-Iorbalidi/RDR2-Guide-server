import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesModule } from './files/files.module';
import { ReportsModule } from './reports/reports.module';
import { LocationModule } from './location/location.module';
import { WeaponModule } from './weapon/weapon.module';
import * as path from 'path';
import { Location } from './location/location.model';
import { Weapon } from './weapon/weapon.model';
import { UserWeapon } from './user_weapon/user_weapon.model';
import { HorseModule } from './horse/horse.module';
import { StoryQuestModule } from './story-quest/story-quest.module';
import { SideQuestModule } from './side-quest/side-quest.module';
import { Horse } from './horse/horse.model';
import { UserHorse } from './user_horse/user_horse.model';
import { StoryQuest } from './story-quest/story-quest.model';
import { UserStoryQuest } from './user_story-quest/user_story-quest.model';
import { SideQuest } from './side-quest/side-quest.model';
import { UserSideQuest } from './user_side-quest/user_side-quest.model';
import { Handling } from './handling/handling.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Location,
        Weapon,
        UserWeapon,
        Horse,
        Handling,
        UserHorse,
        StoryQuest,
        UserStoryQuest,
        SideQuest,
        UserSideQuest,
      ],
      autoLoadModels: true,
    }),
    UserModule,
    AuthModule,
    FilesModule,
    ReportsModule,
    LocationModule,
    WeaponModule,
    HorseModule,
    StoryQuestModule,
    SideQuestModule,
  ],
})
export class AppModule {}
