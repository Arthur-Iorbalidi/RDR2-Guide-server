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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
    private weaponService: WeaponService,
    @InjectModel(UserWeapon) private userWeaponRepository: typeof UserWeapon,
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

  async getSavedWeapons(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: [Weapon],
    });

    return user.weapons;
  }
}
