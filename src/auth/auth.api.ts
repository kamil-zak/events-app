import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoggedUserDto } from './dto/logged-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { ToknesDto } from './dto/toknes.dto';

export const ApiSignIn = applyDecorators(
  ApiOperation({ description: 'Login to app.' }),
  ApiBody({ description: 'Sign in data.', required: true, type: SignInDto }),
  ApiResponse({ status: 200, description: 'User was successfully signed in.', type: ToknesDto }),
  ApiResponse({ status: 401, description: 'Incorrect sign in data.' }),
);

export const ApiSignUp = applyDecorators(
  ApiOperation({ description: 'Create new accound.' }),
  ApiConsumes('multipart/form-data'),
  ApiBody({ description: 'Sign up data.', required: true, type: SignUpDto }),
  ApiResponse({ status: 200, description: 'User was successfully signed up.', type: ToknesDto }),
  ApiResponse({ status: 400, description: 'Incorrect sign up data structure.' }),
  ApiResponse({ status: 409, description: 'Account with that email already exists.' }),
);

export const ApiRefresh = applyDecorators(
  ApiOperation({ description: 'Get new pair of tokens based on refreshToken.' }),
  ApiBody({ description: 'Refresh toknen.', required: true, type: RefreshDto }),
  ApiResponse({ status: 200, description: 'New toknes generated successfully.', type: ToknesDto }),
  ApiResponse({ status: 401, description: 'Invalid or not provided refresh toknen' }),
);

export const ApiLoggedUser = applyDecorators(
  ApiOperation({ description: 'Get current logged in user.' }),
  ApiBearerAuth(),
  ApiResponse({ status: 200, description: 'Successfully returned logged user data.', type: LoggedUserDto }),
  ApiResponse({ status: 401, description: 'Token not provided, invalid or user does not exists.' }),
);
