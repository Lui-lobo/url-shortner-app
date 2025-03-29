import { PrismaService } from '../../../../database/orm/prisma/prisma.service';
import { LoggerService } from '../../../../helpers/logger/logger.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import validateUser from '../validateUser';

describe('validateUser', () => {
  let mockPrisma: PrismaService;
  let mockLogger: LoggerService;
  let bcryptCompareMock: jest.Mock;

  beforeEach(() => {
    mockPrisma = {
      user: { findUnique: jest.fn() },
    } as unknown as PrismaService;

    mockLogger = {
      logInfo: jest.fn(),
      logError: jest.fn(),
    } as unknown as LoggerService;

    // Mock global para bcrypt.compare
    bcryptCompareMock = jest.fn();
    jest.spyOn(bcrypt, 'compare').mockImplementation(bcryptCompareMock);
  });

  it('deve retornar o usuário sem a senha se as credenciais forem válidas', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      shortenedUrls: [], // Se houver relacionamento, ele precisa estar no mock
    };

    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser);
    bcryptCompareMock.mockResolvedValueOnce(true); // Simulando senha correta

    const result = await validateUser(mockLogger, mockPrisma, {
      email: 'test@example.com',
      password: 'validPassword',
    });

    expect(result).toEqual({
      id: '123',
      email: 'test@example.com',
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
      deletedAt: null,
      shortenedUrls: [],
    });
  });

  it('deve lançar UnauthorizedException se o usuário não for encontrado', async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      validateUser(mockLogger, mockPrisma, {
        email: 'invalid@example.com',
        password: 'wrong',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException se a senha estiver incorreta', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      shortenedUrls: [],
    };

    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser);
    jest.spyOn(bcrypt, 'compare').mockImplementation();

    await expect(
      validateUser(mockLogger, mockPrisma, {
        email: 'test@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
