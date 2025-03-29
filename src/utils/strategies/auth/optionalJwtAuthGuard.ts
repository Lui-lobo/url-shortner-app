import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'; // Importando o tipo Request do Express

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>(); // Tipando o request
    const authHeader = request.headers.authorization;

    // Se não houver token, permite a requisição continuar sem autenticação
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return true;
    }

    // Se houver token, ativa o guard normal para extrair o usuário
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err) {
      throw err;
    }
    return user || null; // Se o usuário foi extraído, retorna ele, senão retorna null
  }
}
