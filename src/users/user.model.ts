import { BeforeCreate, BeforeUpdate, Column, Model, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(instance: User) {
    const hash = await bcrypt.hash(instance.password, 10);
    instance.password = hash;
  }

  comparePassword = (password: string) => {
    return bcrypt.compare(password, this.password);
  };
}
