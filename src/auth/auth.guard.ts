import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles === undefined) return true;
    const req = context.switchToHttp().getRequest<Request>();
    const authorization = req.get('authorization') || '';
    const [scheme, token] = authorization.split(' ');
    if (scheme.toLowerCase() !== 'bearer')
      throw new UnauthorizedException('Invalid Authorization Scheme');
    if (!token)
      throw new UnauthorizedException('Authorization token is missing.');
    // if (!req.user) throw new UnauthorizedException();
    let decode: any;
    try {
      decode = await this.jwtService.verifyAsync(token);
    } catch (err) {
      throw new UnauthorizedException(err.name + ' ' + err.message);
    }
    (req as any).user = decode;
    if (roles.length > 0 && !roles.includes(decode.role))
      throw new UnauthorizedException(' Invalid user role');
    return true;
  }
}
