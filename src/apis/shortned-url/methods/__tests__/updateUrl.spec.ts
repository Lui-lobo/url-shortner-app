import updateUrl from '../updateUrl';
import { PrismaService } from '../../../../database/orm/prisma/prisma.service';
import { UpdateUrlDto } from '../../../../utils/dtos/shortnedUrls/updateUrlDto';
import { NotFoundException } from '@nestjs/common';
import { ShortenedUrl } from '@prisma/client';

describe('updateUrl', () => {
  let prisma: PrismaService;
  let findFirstMock: jest.Mock;
  let updateMock: jest.Mock;

  beforeEach(() => {
    prisma = {
      shortenedUrl: {
        findFirst: jest.fn(),
        update: jest.fn(),
      },
    } as any;
    findFirstMock = prisma.shortenedUrl.findFirst as jest.Mock;
    updateMock = prisma.shortenedUrl.update as jest.Mock;
  });

  it('deve atualizar a URL com sucesso', async () => {
    const userId = 'user123';
    const userAgent = 'Chrome';
    const updateUrlData: UpdateUrlDto = {
      shortnedUrlId: 'url123',
      newUrl: 'https://new-example.com',
    };
    const existingUrl: ShortenedUrl = {
      id: updateUrlData.shortnedUrlId,
      originalUrl: 'https://example.com',
      shortenedUrl: 'short123', // Correção aqui
      shortCode: 'code123',
      userId: userId,
      origin: 'Old Origin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      accessCount: 0,
    };
    const updatedUrl: ShortenedUrl = {
      ...existingUrl,
      originalUrl: updateUrlData.newUrl,
      origin: userAgent,
      updatedAt: new Date(),
    };

    findFirstMock.mockResolvedValue(existingUrl);
    updateMock.mockResolvedValue(updatedUrl);

    const result = await updateUrl(prisma, userAgent, userId, updateUrlData);

    expect(findFirstMock).toHaveBeenCalledWith({
      where: {
        id: updateUrlData.shortnedUrlId,
        userId: userId,
        deletedAt: null,
      },
    });
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: updateUrlData.shortnedUrlId },
      data: {
        originalUrl: updateUrlData.newUrl,
        updatedAt: expect.any(Date),
        origin: userAgent,
      },
    });
    expect(result).toEqual(updatedUrl);
  });

  it('deve lançar NotFoundException se a URL não for encontrada', async () => {
    const userId = 'user456';
    const userAgent = 'Firefox';
    const updateUrlData: UpdateUrlDto = {
      shortnedUrlId: 'url404',
      newUrl: 'https://new-example.org',
    };

    findFirstMock.mockResolvedValue(null);

    await expect(
      updateUrl(prisma, userAgent, userId, updateUrlData),
    ).rejects.toThrow(
      new NotFoundException(
        'URL não encontrada ou não pertence a este usuário.',
      ),
    );

    expect(updateMock).not.toHaveBeenCalled();
  });

  it('deve lidar com erros do Prisma', async () => {
    const userId = 'user789';
    const userAgent = 'Edge';
    const updateUrlData: UpdateUrlDto = {
      shortnedUrlId: 'urlError',
      newUrl: 'https://new-example.net',
    };
    const error = new Error('Erro do Prisma');

    findFirstMock.mockRejectedValue(error);

    await expect(
      updateUrl(prisma, userAgent, userId, updateUrlData),
    ).rejects.toThrow(error);
    expect(updateMock).not.toHaveBeenCalled();
  });
});
