import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Horse } from 'src/horse/horse.model';
import { SideQuest } from 'src/side-quest/side-quest.model';
import { StoryQuest } from 'src/story-quest/story-quest.model';
import { UserHorse } from 'src/user_horse/user_horse.model';
import { UserSideQuest } from 'src/user_side-quest/user_side-quest.model';
import { UserStoryQuest } from 'src/user_story-quest/user_story-quest.model';
import { UserWeapon } from 'src/user_weapon/user_weapon.model';
import { Weapon } from 'src/weapon/weapon.model';

interface UserCreationAttrs {
  name: string;
  surname: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Weapon, () => UserWeapon)
  weapons: Weapon[];

  @BelongsToMany(() => Horse, () => UserHorse)
  horses: Horse[];

  @BelongsToMany(() => StoryQuest, () => UserStoryQuest)
  storyQuests: StoryQuest[];

  @BelongsToMany(() => SideQuest, () => UserSideQuest)
  sideQuests: SideQuest[];
}
