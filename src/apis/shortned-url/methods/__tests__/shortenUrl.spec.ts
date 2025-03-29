import shortenUrl from '../shortenUrl';
import { PrismaService } from '../../../../database/orm/prisma/prisma.service';
import { LoggerService } from '../../../../helpers/logger/logger.service';
import { ShortenUrlDto } from '../../../../utils/dtos/shortnedUrls/shortenUrl.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { ShortenedUrl } from '@prisma/client';
import { randomBytes } from 'crypto';

jest.mock('crypto');

describe('shortenUrl', () => {
  let prisma: PrismaService;
  let loggerService: LoggerService;
  let findFirstMock: jest.Mock;
  let createMock: jest.Mock;

  beforeEach(() => {
    prisma = {
      shortenedUrl: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    } as any;
    loggerService = {
      logInfo: jest.fn(),
      logError: jest.fn(),
    } as any;
    findFirstMock = prisma.shortenedUrl.findFirst as jest.Mock;
    createMock = prisma.shortenedUrl.create as jest.Mock;
  });

  it('deve retornar a URL encurtada existente se ela já existir para o usuário', async () => {
    const dto: ShortenUrlDto = { url: 'https://example.com' };
    const userId = 'user123';
    const userAgent = 'Chrome';
    const existingUrl: ShortenedUrl = {
      id: '1',
      originalUrl: dto.url,
      shortenedUrl: 'short123',
      shortCode: 'code123',
      userId: userId,
      origin: userAgent,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      accessCount: 0,
    };

    findFirstMock.mockResolvedValue(existingUrl);

    const result = await shortenUrl(
      loggerService,
      prisma,
      dto,
      userAgent,
      userId,
    );

    expect(findFirstMock).toHaveBeenCalledWith({
      where: { originalUrl: dto.url, userId: userId, deletedAt: null },
    });
    expect(result).toEqual(existingUrl);
    expect(createMock).not.toHaveBeenCalled();
  });

  it('deve criar uma nova URL encurtada se ela não existir', async () => {
    const dto: ShortenUrlDto = { url: 'https://example.com/new' };
    const userId = 'user456';
    const userAgent = 'Firefox';
    const shortenedCode = 'newCode';
    const shortenedUrl = `${process.env.BASE_URL}/${shortenedCode}`;

    findFirstMock.mockResolvedValue(null);
    (randomBytes as jest.Mock).mockReturnValue({
      toString: () => shortenedCode,
    });
    createMock.mockResolvedValue({
      id: '2',
      originalUrl: dto.url,
      shortUrl: shortenedUrl,
      shortCode: shortenedCode,
      userId: userId,
      origin: userAgent,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      accessCount: 0,
    });

    const result = await shortenUrl(
      loggerService,
      prisma,
      dto,
      userAgent,
      userId,
    );

    expect(findFirstMock).toHaveBeenCalledWith({
      where: { originalUrl: dto.url, userId: userId, deletedAt: null },
    });
    expect(createMock).toHaveBeenCalledWith({
      data: {
        originalUrl: dto.url,
        shortCode: shortenedCode,
        shortenedUrl: shortenedUrl,
        userId: userId,
        origin: userAgent,
      },
    });
    expect(result).toEqual(expect.objectContaining({ shortUrl: shortenedUrl }));
  });

  it('deve criar uma nova URL encurtada sem userId', async () => {
    const dto: ShortenUrlDto = { url: 'https://example.com/new2' };
    const userAgent = 'Safari';
    const shortenedCode = 'newCode2';
    const shortenedUrl = `${process.env.BASE_URL}/${shortenedCode}`;

    findFirstMock.mockResolvedValue(null);
    (randomBytes as jest.Mock).mockReturnValue({
      toString: () => shortenedCode,
    });
    createMock.mockResolvedValue({
      id: '3',
      originalUrl: dto.url,
      shortUrl: shortenedUrl,
      shortCode: shortenedCode,
      userId: null,
      origin: userAgent,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      accessCount: 0,
    });

    const result = await shortenUrl(
      loggerService,
      prisma,
      dto,
      userAgent,
      undefined,
    );

    expect(findFirstMock).not.toHaveBeenCalled(); // Alteração aqui
    expect(createMock).toHaveBeenCalledWith({
      data: {
        originalUrl: dto.url,
        shortCode: shortenedCode,
        shortenedUrl: shortenedUrl,
        userId: null,
        origin: userAgent,
      },
    });
    expect(result).toEqual(expect.objectContaining({ shortUrl: shortenedUrl }));
  });

  it('deve lidar com erros do Prisma', async () => {
    const dto: ShortenUrlDto = { url: 'https://example.com/error' };
    const userId = 'user789';
    const userAgent = 'Edge';
    const error = new Error('Erro do Prisma');

    findFirstMock.mockRejectedValue(error);

    await expect(
      shortenUrl(loggerService, prisma, dto, userAgent, userId),
    ).rejects.toThrow(
      new InternalServerErrorException(
        `Erro ao criar URL encurtada, error -> ${JSON.stringify(error)}`,
      ),
    );
  });
});
