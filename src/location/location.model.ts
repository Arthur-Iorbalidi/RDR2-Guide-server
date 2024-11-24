import { Table, Column, DataType, Model } from 'sequelize-typescript';

interface LocationCreationAttrs {
  name: string;
  image: string;
}

@Table({ tableName: 'locations' })
export class Location extends Model<Location, LocationCreationAttrs> {
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
  image: string;
}
