import { Body, Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import UserId from 'src/common/decorators/user-id.decorator';
import { UsersService } from 'src/users/users.service';
import { ApiRefresh, ApiSignIn, ApiSignUp } from './auth.api';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { ToknesDto } from './dto/toknes.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiSignIn
  async signIn(@UserId() userId: number): Promise<ToknesDto> {
    const toknes = this.authService.signIn(userId);
    return toknes;
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiSignUp
  async signUp(@Body() body: SignUpDto, @UploadedFile() avatar: Express.Multer.File): Promise<ToknesDto> {
    const toknes = await this.authService.signUp(body, avatar);
    return toknes;
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(200)
  @ApiRefresh
  async refresh(@UserId() userId: number): Promise<ToknesDto> {
    const toknes = await this.authService.refresh(userId);
    return toknes;
  }
}
