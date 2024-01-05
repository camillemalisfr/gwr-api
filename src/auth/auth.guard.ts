import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

const { PUBLIC_KEY } = process.env;

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      jwt.verify(token, PUBLIC_KEY);
      // TODO: the result of jwt.verify (the JWT payload) can be used to get the scopes and to authorization checks
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private getToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
