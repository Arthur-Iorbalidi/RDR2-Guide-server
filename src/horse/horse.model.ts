import { Table, Column, DataType, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Handling } from "src/handling/handling.model";
import { Location } from "src/location/location.model";

interface HorseCreationAttrs {
  name: string;
  health: number;
  stamina: number;
  speed: number;
  accelerarion: number;
  handlingId: number;
  locationId?: number;
  image?: string;
}

@Table({ tableName: 'horses' })
export class Horse extends Model<Horse, HorseCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  health: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  stamina: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  speed: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  accelerarion: number;

  @Column({ type: DataType.STRING, allowNull: true })
  image?: string;

  @ForeignKey(() => Handling)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  handlingId: number;

  @BelongsTo(() => Handling)
  handling: Handling;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  locationId: number | null;

  @BelongsTo(() => Location)
  location: Location | null;
}
