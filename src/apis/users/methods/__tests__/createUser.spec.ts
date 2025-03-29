import createUser from '../createUser';
import { PrismaService } from '../../../../database/orm/prisma/prisma.service';
import { LoggerService } from '../../../../helpers/logger/logger.service';
import { CreateUserDto } from '../../../../utils/dtos/user/createUserDto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

jest.mock('bcrypt');

describe('createUser', () => {
  let prisma: PrismaService;
  let logger: LoggerService;
  let findUniqueMock: jest.Mock;
  let createMock: jest.Mock;
  let hashMock: jest.Mock;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    } as any;
    logger = {
      logInfo: jest.fn(),
      logError: jest.fn(),
    } as any;
    findUniqueMock = prisma.user.findUnique as jest.Mock;
    createMock = prisma.user.create as jest.Mock;
    hashMock = bcrypt.hash as jest.Mock;
    hashMock.mockClear(); // Limpa o mock antes de cada teste
  });

  it('deve criar um novo usuário se o email não estiver registrado', async () => {
    const userData: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const hashedPassword = 'hashedPassword';

    findUniqueMock.mockResolvedValue(null);
    hashMock.mockResolvedValue(hashedPassword);
    createMock.mockResolvedValue({
      email: userData.email,
      password: hashedPassword,
    });

    const result = await createUser(logger, prisma, userData);

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(hashMock).toHaveBeenCalledWith(userData.password, 10);
    expect(createMock).toHaveBeenCalledWith({
      data: { email: userData.email, password: hashedPassword },
    });
    expect(result).toEqual({ email: userData.email, password: hashedPassword });
  });

  it('deve lançar ConflictException se o email já estiver registrado', async () => {
    const userData: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const existingUser = {
      email: userData.email,
      password: 'existingHashedPassword',
    };

    findUniqueMock.mockResolvedValue(existingUser);

    await expect(createUser(logger, prisma, userData)).rejects.toThrow(
      new ConflictException('Email already in use'),
    );

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(hashMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });

  it('deve lidar com erros do Prisma', async () => {
    const userData: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const error = new Error('Prisma error');

    findUniqueMock.mockRejectedValue(error);

    await expect(createUser(logger, prisma, userData)).rejects.toThrow(error);

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(hashMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });

  it('deve lidar com erros do bcrypt', async () => {
    const userData: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const error = new Error('bcrypt error');

    findUniqueMock.mockResolvedValue(null);
    hashMock.mockRejectedValue(error);

    await expect(createUser(logger, prisma, userData)).rejects.toThrow(error);

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(hashMock).toHaveBeenCalledWith(userData.password, 10);
    expect(createMock).not.toHaveBeenCalled();
  });
});
