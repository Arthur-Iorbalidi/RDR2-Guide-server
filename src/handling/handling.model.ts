import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'handlings', timestamps: false })
export class Handling extends Model<Handling> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  handling: string;
}
