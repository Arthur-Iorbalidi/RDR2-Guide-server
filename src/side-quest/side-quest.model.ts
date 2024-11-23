import { Table, Column, DataType, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Location } from "src/location/location.model";

interface SideQuestCreationAttrs {
  number: number;
  name: string;
  reward: string;
  locationId?: number;
  image?: string;
}

@Table({ tableName: 'side-quests' })
export class SideQuest extends Model<SideQuest, SideQuestCreationAttrs> {
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
  reward: string;

  @Column({ type: DataType.STRING, allowNull: false })
  questGiver: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isMissable: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  missableChapter?: string;

  @Column({ type: DataType.STRING, allowNull: false })
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
