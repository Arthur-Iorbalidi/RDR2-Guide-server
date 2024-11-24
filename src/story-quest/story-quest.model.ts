import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Location } from 'src/location/location.model';

interface StoryQuestCreationAttrs {
  number: number;
  name: string;
  reward?: string;
  locationId?: number;
  image?: string;
}

@Table({ tableName: 'story-quests' })
export class StoryQuest extends Model<StoryQuest, StoryQuestCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  number: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  reward?: string;

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
