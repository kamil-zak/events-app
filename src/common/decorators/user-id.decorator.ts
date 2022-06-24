import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import IUserPayload from 'src/auth/interfaces/user-payload.interface';

const UserId = createParamDecorator((_, context: ExecutionContext) => {
  const user = context.switchToHttp().getRequest().user as IUserPayload;
  return user.id;
});

export default UserId;
