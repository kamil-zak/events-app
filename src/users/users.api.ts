import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { UserDto } from './dto/user.dto';

const userUnauthenticatedResponse = { status: 401, description: 'Unauhenticated request.' };

export const ApiGetProfile = applyDecorators(
  ApiOperation({ description: 'Get current user details.' }),
  ApiBearerAuth(),
  ApiResponse({ status: 200, type: UserDto }),
  ApiResponse(userUnauthenticatedResponse),
);

export const ApiChangePassword = applyDecorators(
  ApiOperation({ description: 'Change current user password' }),
  ApiBearerAuth(),
  ApiBody({ required: true, type: ChangePasswordDto }),
  ApiResponse({ status: 204, description: 'Password changed.' }),
  ApiResponse({ status: 400, description: 'Old password is incorrect.' }),
  ApiResponse(userUnauthenticatedResponse),
);

export const ApiUpdateAvatar = applyDecorators(
  ApiConsumes('multipart/form-data'),
  ApiOperation({ description: 'Update current user avatar.' }),
  ApiBearerAuth(),
  ApiBody({ required: true, type: UpdateAvatarDto }),
  ApiResponse({ status: 204, description: 'Avatar updated successfully.' }),
  ApiResponse({ status: 400, description: 'File not provided or format is not supported.' }),
  ApiResponse(userUnauthenticatedResponse),
);
