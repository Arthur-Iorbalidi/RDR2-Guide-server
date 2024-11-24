import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SideQuest } from 'src/side-quest/side-quest.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'user_side-quest', timestamps: false })
export class UserSideQuest extends Model<UserSideQuest> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => SideQuest)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  sideQuestId: number;
}
