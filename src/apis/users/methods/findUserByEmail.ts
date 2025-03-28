// Importando serviços
import { LoggerService } from 'src/helpers/logger/logger.service';
import { PrismaService } from '../../../database/orm/prisma/prisma.service';
// Importando DTOs
import { FindUserByEmailDto } from 'src/utils/dtos/user/findUserByEmailDto';

export default async function findUserByEmail(
  logger: LoggerService,
  prisma: PrismaService,
  userEmail: FindUserByEmailDto,
) {
  const { email } = userEmail;

  logger.logInfo(`Searching for user with email: ${email}`);

  return prisma.user.findUnique({ where: { email } });
}
