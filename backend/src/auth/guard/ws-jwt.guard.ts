import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const client = context.switchToWs().getClient();
      const cookies = client.handshake.headers.authorization.split(' ');
      const authToken = cookies.pop();
      const jwtPayload = jwt.verify(authToken, process.env.JWT_SECRET_WORD);

      context.switchToHttp().getRequest().user = jwtPayload;
      return Boolean(true);
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
