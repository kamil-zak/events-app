import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const UserId = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user.id;
});

export default UserId;
