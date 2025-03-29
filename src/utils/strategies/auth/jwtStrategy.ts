import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Definindo o tipo esperado para o payload do JWT
interface JwtPayload {
  sub: string; // id do usuário
  username: string; // nome de usuário
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'default_secret', // Garantindo um valor padrão para o typescript
    });
  }

  // Usando a interface JwtPayload para tipar o payload
  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
