import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByLoginData(email: string, pass: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(pass))) return null;
    return user;
  }

  async findById(userId: number) {
    const user = await this.userModel.findByPk(userId);
    return user;
  }

  async create(email: string, password: string): Promise<User> {
    try {
      const user = await this.userModel.create({ email, password });
      return user;
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') throw new ConflictException('Email already exists.');
      throw e;
    }
  }
}
