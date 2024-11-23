import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { StoryQuest } from 'src/story-quest/story-quest.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'user_story-quest', timestamps: false })
export class UserStoryQuest extends Model<UserStoryQuest> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => StoryQuest)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  storyQuestId: number;
}
