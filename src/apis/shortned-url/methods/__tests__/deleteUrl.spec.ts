import { NotFoundException } from '@nestjs/common';
import deleteUrl from '../../methods/deleteUrl';
import { PrismaService } from '../../../../database/orm/prisma/prisma.service';
import { DeleteUrlDto } from '../../../../utils/dtos/shortnedUrls/deleteUrlDto';

describe('deleteUrl', () => {
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = new PrismaService();
  });

  it('deve deletar uma URL encurtada com sucesso', async () => {
    const userId = 'user-id';
    const deleteUrlData: DeleteUrlDto = { shortenedUrlId: 'url-id' };

    const existingUrl = {
      id: 'url-id',
      userId: 'user-id',
      shortenedUrl: 'http://short.ly/abc123',
      originalUrl: 'http://example.com',
      shortCode: 'abc123',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      origin: 'web',
      accessCount: 0,
    };

    jest.spyOn(prisma.shortenedUrl, 'findFirst').mockResolvedValue(existingUrl);

    jest.spyOn(prisma.shortenedUrl, 'update').mockResolvedValue({
      ...existingUrl,
      deletedAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await deleteUrl(prisma, userId, deleteUrlData);
    expect(result.deletedAt).toBeInstanceOf(Date);
  });

  it('deve lançar uma exceção se a URL não for encontrada', async () => {
    const userId = 'user-id';
    const deleteUrlData: DeleteUrlDto = { shortenedUrlId: 'url-id' };

    jest.spyOn(prisma.shortenedUrl, 'findFirst').mockResolvedValue(null);

    await expect(deleteUrl(prisma, userId, deleteUrlData)).rejects.toThrow(
      NotFoundException,
    );
  });
});
