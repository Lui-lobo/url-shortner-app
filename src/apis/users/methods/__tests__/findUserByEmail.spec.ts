import findUserByEmail from '../findUserByEmail';
import { PrismaService } from '../../../../database/orm/prisma/prisma.service';
import { LoggerService } from '../../../../helpers/logger/logger.service';
import { FindUserByEmailDto } from '../../../../utils/dtos/user/findUserByEmailDto';
import { User } from '@prisma/client';

describe('findUserByEmail', () => {
  let prisma: PrismaService;
  let logger: LoggerService;
  let findUniqueMock: jest.Mock;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
      },
    } as any;
    logger = {
      logInfo: jest.fn(),
    } as any;
    findUniqueMock = prisma.user.findUnique as jest.Mock;
  });

  it('deve retornar o usuário se o email for encontrado', async () => {
    const userEmail: FindUserByEmailDto = { email: 'test@example.com' };
    const foundUser: User = {
      id: '1',
      email: userEmail.email,
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null, // Adicionado deletedAt: null
    };

    findUniqueMock.mockResolvedValue(foundUser);

    const result = await findUserByEmail(logger, prisma, userEmail);

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: userEmail.email },
    });
    expect(result).toEqual(foundUser);
  });

  it('deve retornar null se o email não for encontrado', async () => {
    const userEmail: FindUserByEmailDto = { email: 'nonexistent@example.com' };

    findUniqueMock.mockResolvedValue(null);

    const result = await findUserByEmail(logger, prisma, userEmail);

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: userEmail.email },
    });
    expect(result).toBeNull();
  });

  it('deve lidar com erros do Prisma', async () => {
    const userEmail: FindUserByEmailDto = { email: 'error@example.com' };
    const error = new Error('Prisma error');

    findUniqueMock.mockRejectedValue(error);

    await expect(findUserByEmail(logger, prisma, userEmail)).rejects.toThrow(
      error,
    );

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: userEmail.email },
    });
  });
});
