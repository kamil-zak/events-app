import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/files/files.service';
import { SignUpDto } from './dto/signup.dto';
import { ToknesDto } from './dto/toknes.dto';
import ITokenPayload from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private filesService: FilesService,
  ) {}

  private generateToknes(userId: number): ToknesDto {
    const payload: ITokenPayload = { sub: userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '5m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
    return { accessToken, refreshToken };
  }

  async getValidatedUserId(email: string, pass: string): Promise<number | null> {
    const user = await this.usersService.findByLoginData(email, pass);
    if (!user) return null;
    return user.id;
  }

  signIn(userId: number): ToknesDto {
    return this.generateToknes(userId);
  }

  async signUp(userData: SignUpDto, avatar: Express.Multer.File): Promise<ToknesDto> {
    const user = await this.usersService.create(userData.email, userData.password);
    if (avatar) {
      this.filesService.storeAvatar(avatar, user.id);
    }
    return this.generateToknes(user.id);
  }

  async refresh(userId: number): Promise<ToknesDto> {
    return this.generateToknes(userId);
  }
}
