import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid user ID');
    }

    if (userId !== parsedId) {
      throw new ForbiddenException('You can update only your own profile');
    }

    return this.userService.updateUser(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saved/weapons/:id')
  addWeaponToSaved(@Req() req, @Param('id') id: number) {
    const userId: number = req.user.id;

    return this.userService.addWeaponToSaved(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('saved/weapons/:id')
  removeWeaponFromSaved(@Req() req, @Param('id') id: number) {
    const userId: number = req.user.id;

    return this.userService.removeWeaponFromSaved(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saved/horses/:id')
  addHorseToSaved(@Req() req, @Param('id') id: number) {
    const userId: number = req.user.id;

    return this.userService.addHorseToSaved(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('saved/horses/:id')
  removeHorseFromSaved(@Req() req, @Param('id') id: number) {
    const userId: number = req.user.id;

    return this.userService.removeHorseFromSaved(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saved/story-quests/:id')
  addStoryQuestToSaved(@Req() req, @Param('id') id: number) {
    const userId: number = req.user.id;

    return this.userService.addStoryQuestToSaved(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('saved/story-quests/:id')
  removeStoryQuestFromSaved(@Req() req, @Param('id') id: number) {
    const userId: number = req.user.id;

    return this.userService.removeStoryQuestFromSaved(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saved/side-quests/:id')
  addSideQuestToSaved(@Req() req, @Param('id') id: number) {
    const userId: number = req.user.id;

    return this.userService.addSideQuestToSaved(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('saved/side-quests/:id')
  removeSideQuestFromSaved(@Req() req, @Param('id') id: number) {
    const userId: number = req.user.id;

    return this.userService.removeSideQuestFromSaved(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('saved/weapons')
  getSavedWeapons(@Req() req) {
    const userId: number = req.user.id;

    return this.userService.getSavedWeapons(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('saved/horses')
  getSavedHorses(@Req() req) {
    const userId: number = req.user.id;

    return this.userService.getSavedHorses(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('saved/story-quests')
  getSavedStoryQuests(@Req() req) {
    const userId: number = req.user.id;

    return this.userService.getSavedStoryQuests(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('saved/side-quests')
  getSavedSideQuests(@Req() req) {
    const userId: number = req.user.id;

    return this.userService.getSavedSideQuests(userId);
  }
}
