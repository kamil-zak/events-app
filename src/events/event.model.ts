import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table
export class Event extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @Column
  name: string;

  @Column(DataType.DATEONLY)
  startDate: string;

  @Column(DataType.DATEONLY)
  endDate: string;

  @BelongsTo(() => User)
  user: User;
}
