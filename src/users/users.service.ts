import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private filesService: FilesService,
  ) {}

  private excludePassword(user: User): UserDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user.get({ plain: true });
    return rest;
  }

  async findByLoginData(email: string, pass: string): Promise<UserDto | null> {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(pass))) return null;
    return this.excludePassword(user);
  }

  async findById(userId: number): Promise<UserDto | null> {
    const user = await this.userModel.findByPk(userId);
    if (!user) return null;
    return this.excludePassword(user);
  }

  async create(email: string, password: string): Promise<UserDto> {
    try {
      const user = await this.userModel.create({ email, password });
      return this.excludePassword(user);
    } catch (e: any) {
      if (e.name === 'SequelizeUniqueConstraintError') throw new ConflictException('Email already exists.');
      throw e;
    }
  }

  async changePassword(userId: number, { oldPassword, newPassword }: ChangePasswordDto): Promise<void> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new InternalServerErrorException();
    if (!(await user.comparePassword(oldPassword))) throw new BadRequestException('Incorrect old password.');
    user.update({ password: newPassword });
    await user.save();
  }

  async updateAvatar(userId: number, avatar: Express.Multer.File): Promise<void> {
    this.filesService.storeAvatar(avatar, userId);
  }
}
