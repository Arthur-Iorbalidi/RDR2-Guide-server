import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Horse } from 'src/horse/horse.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'user_horses', timestamps: false })
export class UserHorse extends Model<UserHorse> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Horse)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  horseId: number;
}
