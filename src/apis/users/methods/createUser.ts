// Importando serviços
import { PrismaService } from '../../../database/orm/prisma/prisma.service';
import { LoggerService } from 'src/helpers/logger/logger.service';
// Importando DTO
import { CreateUserDto } from 'src/utils/dtos/user/createUserDto';
// Importando lib de criptografia/hash
import * as bcrypt from 'bcrypt';
// Importando exceptions
import { ConflictException } from '@nestjs/common';

export default async function createUser(
  logger: LoggerService,
  prisma: PrismaService,
  userData: CreateUserDto,
) {
  const { email, password } = userData;

  logger.logInfo(`Checking if email ${email} is already registered`);

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    logger.logError(`Email ${email} is already in use`);
    throw new ConflictException('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  logger.logInfo(`Creating new user with the email: ${email}`);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}
