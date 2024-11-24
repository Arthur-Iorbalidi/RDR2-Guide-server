import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Weapon } from 'src/weapon/weapon.model';
import { Horse } from 'src/horse/horse.model';
import { StoryQuest } from 'src/story-quest/story-quest.model';
import { SideQuest } from 'src/side-quest/side-quest.model';
import { WeaponService } from 'src/weapon/weapon.service';
import { UserWeapon } from 'src/user_weapon/user_weapon.model';
import { HorseService } from 'src/horse/horse.service';
import { UserHorse } from 'src/user_horse/user_horse.model';
import { StoryQuestService } from 'src/story-quest/story-quest.service';
import { UserStoryQuest } from 'src/user_story-quest/user_story-quest.model';
import { SideQuestService } from 'src/side-quest/side-quest.service';
import { UserSideQuest } from 'src/user_side-quest/user_side-quest.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
    private weaponService: WeaponService,
    @InjectModel(UserWeapon) private userWeaponRepository: typeof UserWeapon,
    private horseService: HorseService,
    @InjectModel(UserHorse) private userHorseRepository: typeof UserHorse,
    private storyQuestService: StoryQuestService,
    @InjectModel(UserStoryQuest)
    private userStoryQuestRepository: typeof UserStoryQuest,
    private sideQuestService: SideQuestService,
    @InjectModel(UserSideQuest)
    private userSideQuestRepository: typeof UserSideQuest,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return await this.getUserByEmail(user.email);
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });

    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: [
        { model: Weapon, attributes: ['id'], through: { attributes: [] } },
        { model: Horse, attributes: ['id'], through: { attributes: [] } },
        { model: StoryQuest, attributes: ['id'], through: { attributes: [] } },
        { model: SideQuest, attributes: ['id'], through: { attributes: [] } },
      ],
    });

    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const updatedUser = { ...dto };
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.password) {
      if (!dto.oldPassword) {
        throw new UnauthorizedException({ message: 'Incorrect password' });
      }

      const passwordEquals = await bcrypt.compare(
        dto.oldPassword,
        user.password,
      );

      if (!passwordEquals) {
        throw new UnauthorizedException({ message: 'Incorrect password' });
      }

      const isSamePassword = await bcrypt.compare(dto.password, user.password);
      if (isSamePassword) {
        throw new ConflictException({
          message: 'New password must be different from the current password',
        });
      }

      const hashPassword = await bcrypt.hash(dto.password, 10);
      updatedUser.password = hashPassword;
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException({ message: 'Email is already taken' });
      }
    }

    await user.update(updatedUser);

    const payload = { email: user.email, id: user.id };

    const newToken = this.jwtService.sign(payload);

    return { user: user, token: newToken };
  }

  async addWeaponToSaved(userId: number, weaponId: number) {
    if (!userId || !weaponId) {
      throw new BadRequestException('userId or weaponId not provided');
    }

    const user = await this.getUserById(userId);
    const weapon = await this.weaponService.getById(weaponId);

    if (user && weapon) {
      const userWeapon = await this.userWeaponRepository.create({
        userId,
        weaponId,
      });
      return userWeapon;
    } else {
      throw new NotFoundException('User or Weapon not found');
    }
  }

  async removeWeaponFromSaved(userId: number, weaponId: number) {
    if (!userId || !weaponId) {
      throw new BadRequestException('userId or movieId not provided');
    }

    const userWeaponRecord = await this.userWeaponRepository.findOne({
      where: { userId, weaponId },
    });

    if (userWeaponRecord) {
      await userWeaponRecord.destroy();
      return userWeaponRecord;
    } else {
      throw new NotFoundException("Weapon not found in user's saved");
    }
  }

  async addHorseToSaved(userId: number, horseId: number) {
    if (!userId || !horseId) {
      throw new BadRequestException('userId or horseId not provided');
    }

    const user = await this.getUserById(userId);
    const horse = await this.horseService.getById(horseId);

    if (user && horse) {
      const userHorse = await this.userHorseRepository.create({
        userId,
        horseId,
      });
      return userHorse;
    } else {
      throw new NotFoundException('User or Horse not found');
    }
  }

  async removeHorseFromSaved(userId: number, horseId: number) {
    if (!userId || !horseId) {
      throw new BadRequestException('userId or horseId not provided');
    }

    const userHorseRecord = await this.userHorseRepository.findOne({
      where: { userId, horseId },
    });

    if (userHorseRecord) {
      await userHorseRecord.destroy();
      return userHorseRecord;
    } else {
      throw new NotFoundException("Horse not found in user's saved");
    }
  }

  async addStoryQuestToSaved(userId: number, storyQuestId: number) {
    if (!userId || !storyQuestId) {
      throw new BadRequestException('userId or storyQuestId not provided');
    }

    const user = await this.getUserById(userId);
    const storyQuest = await this.storyQuestService.getById(storyQuestId);

    if (user && storyQuest) {
      const userStoryQuest = await this.userStoryQuestRepository.create({
        userId,
        storyQuestId,
      });
      return userStoryQuest;
    } else {
      throw new NotFoundException('User or StoryQuest not found');
    }
  }

  async removeStoryQuestFromSaved(userId: number, storyQuestId: number) {
    if (!userId || !storyQuestId) {
      throw new BadRequestException('userId or storyQuestId not provided');
    }

    const userStoryQuestRecord = await this.userStoryQuestRepository.findOne({
      where: { userId, storyQuestId },
    });

    if (userStoryQuestRecord) {
      await userStoryQuestRecord.destroy();
      return userStoryQuestRecord;
    } else {
      throw new NotFoundException("StoryQuest not found in user's saved");
    }
  }

  async addSideQuestToSaved(userId: number, sideQuestId: number) {
    if (!userId || !sideQuestId) {
      throw new BadRequestException('userId or sideQuestId not provided');
    }

    const user = await this.getUserById(userId);
    const sideQuest = await this.sideQuestService.getById(sideQuestId);

    if (user && sideQuest) {
      const userSideQuest = await this.userSideQuestRepository.create({
        userId,
        sideQuestId,
      });
      return userSideQuest;
    } else {
      throw new NotFoundException('User or SideQuest not found');
    }
  }

  async removeSideQuestFromSaved(userId: number, sideQuestId: number) {
    if (!userId || !sideQuestId) {
      throw new BadRequestException('userId or sideQuestId not provided');
    }

    const userStoryQuestRecord = await this.userSideQuestRepository.findOne({
      where: { userId, sideQuestId },
    });

    if (userStoryQuestRecord) {
      await userStoryQuestRecord.destroy();
      return userStoryQuestRecord;
    } else {
      throw new NotFoundException("SideQuest not found in user's saved");
    }
  }

  async getSavedWeapons(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: [Weapon],
    });

    return user.weapons;
  }

  async getSavedHorses(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: [Horse],
    });

    return user.horses;
  }

  async getSavedStoryQuests(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: [StoryQuest],
    });

    return user.storyQuests;
  }

  async getSavedSideQuests(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: [SideQuest],
    });

    return user.sideQuests;
  }
}
