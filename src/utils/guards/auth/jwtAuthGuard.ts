import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // tratar corretamente o erro de usuário não autenticado
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Usuário não autenticado');
    }
    return user;
  }
}
