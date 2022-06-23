import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import ProtectedRoute from 'src/common/decorators/protected-route.decorator';
import UserId from 'src/common/decorators/user-id.decorator';
import { UsersService } from 'src/users/users.service';
import { ApiLoggedUser, ApiRefresh, ApiSignIn, ApiSignUp } from './auth.api';
import { AuthService } from './auth.service';
import { LoggedUserDto } from './dto/logged-user.dto';
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
    console.log(avatar);
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

  @Get('user')
  @ProtectedRoute
  @ApiLoggedUser
  async user(@UserId() userId: number): Promise<LoggedUserDto> {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException();
    const { id, email } = user;
    return { id, email };
  }
}
