// Importando serviços
import { PrismaService } from '../../../database/orm/prisma/prisma.service';
import { LoggerService } from '../../../helpers/logger/logger.service';
// Importando exceções e modulos comuns do nestJs
import { UnauthorizedException } from '@nestjs/common';
// Importando lib de criptografia/hash
import * as bcrypt from 'bcrypt';
// Importando DTOs
import { ValidateUserDto } from '../../../utils/dtos/auth/validateUserDto';

export default async function validateUser(
  logger: LoggerService,
  prisma: PrismaService,
  userData: ValidateUserDto,
) {
  const { email, password } = userData;

  logger.logInfo(`Validating user with email: ${email}`);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    logger.logError(`Invalid credentials for email: ${email}`);
    throw new UnauthorizedException('Invalid credentials');
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
