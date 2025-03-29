import { PrismaService } from '../../../../database/orm/prisma/prisma.service';
import listUserUrls from '../listUserUrls';
import { Prisma } from '@prisma/client';

jest.mock('../../../../database/orm/prisma/prisma.service');

describe('listUserUrls', () => {
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      shortenedUrl: {
        findMany: jest.fn(),
      },
    } as any;
  });

  it('deve retornar as URLs do usuário', async () => {
    const userId = 'user-id-123';
    const mockUrls = [
      {
        id: 'url-id-1',
        userId: userId,
        shortenedUrl: 'http://short.url/1',
        originalUrl: 'http://example.com/1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'url-id-2',
        userId: userId,
        shortenedUrl: 'http://short.url/2',
        originalUrl: 'http://example.com/2',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    (prisma.shortenedUrl.findMany as jest.Mock).mockResolvedValue(mockUrls);

    const result = await listUserUrls(prisma, userId);

    expect(result).toEqual(mockUrls);
    expect(prisma.shortenedUrl.findMany).toHaveBeenCalledWith({
      where: { userId, deletedAt: null },
    });
  });

  it('deve retornar um array vazio caso não encontre URLs ativas', async () => {
    const userId = 'user-id-123';
    const mockUrls = [];

    (prisma.shortenedUrl.findMany as jest.Mock).mockResolvedValue(mockUrls);

    const result = await listUserUrls(prisma, userId);

    expect(result).toEqual([]);
    expect(prisma.shortenedUrl.findMany).toHaveBeenCalledWith({
      where: { userId, deletedAt: null },
    });
  });
});
