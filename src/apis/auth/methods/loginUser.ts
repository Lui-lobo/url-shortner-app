// Importando serviços
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../../helpers/logger/logger.service';
// Importando modelos
import { User } from '@prisma/client';

export default async function loginUser(
  logger: LoggerService,
  jwtService: JwtService,
  user: Partial<User>,
) {
  logger.logInfo(
    `Generating JWT token for user with email: ${user.email} at ${new Date().toISOString()}`,
  );
  const payload = { email: user.email, sub: user.id };
  return { access_token: jwtService.sign(payload) };
}
