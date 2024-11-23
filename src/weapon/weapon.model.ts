import { Table, Column, DataType, ForeignKey, BelongsTo, Model } from "sequelize-typescript";
import { Location } from "src/location/location.model";

interface WeaponCreationAttrs {
  name: string;
  damage: number;
  range: number;
  firingRate: number;
  accuracy: number;
  ammo: number;
  cost: number;
  isUnique: number;
  locationId?: number;
  image?: string;
}

@Table({ tableName: 'weapons' })
export class Weapon extends Model<Weapon, WeaponCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  damage: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  range: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  firingRate: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  accuracy: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  ammo: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  cost: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isUnique: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  image?: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  locationId: number | null;

  @BelongsTo(() => Location)
  location: Location | null;
}
