import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Weapon } from 'src/weapon/weapon.model';

@Table({ tableName: 'user_weapons', timestamps: false })
export class UserWeapon extends Model<UserWeapon> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Weapon)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  weaponId: number;
}
