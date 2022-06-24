import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import IUserPayload from '../interfaces/user-payload.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<IUserPayload> {
    const id = await this.authService.getValidatedUserId(email, password);
    if (!id) {
      throw new UnauthorizedException('Incorrect sign in data.');
    }
    return { id };
  }
}
