import { SetMetadata } from '@nestjs/common';

export const Auth = (...roles: ('user' | 'admin')[]) =>
  SetMetadata('roles', roles);
