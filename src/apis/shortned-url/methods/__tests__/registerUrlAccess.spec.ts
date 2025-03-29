import registerUrlAccess from '../registerUrlAccess';
import { PrismaService } from '../../../../database/orm/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('registerUrlAccess', () => {
  let prisma: PrismaService;
  let findUniqueMock: jest.Mock;
  let updateMock: jest.Mock;

  beforeEach(() => {
    prisma = {
      shortenedUrl: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    } as any;
    findUniqueMock = prisma.shortenedUrl.findUnique as jest.Mock;
    updateMock = prisma.shortenedUrl.update as jest.Mock;
  });

  it('deve registrar o acesso e retornar a URL original', async () => {
    const shortenedUrl = 'short123';
    const urlEntry = {
      id: '1',
      originalUrl: 'https://www.example.com',
      shortenedUrl: shortenedUrl,
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      userId: 'user123',
    };

    findUniqueMock.mockResolvedValue(urlEntry);
    updateMock.mockResolvedValue({ ...urlEntry, accessCount: 1 });

    const result = await registerUrlAccess(prisma, shortenedUrl);

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { shortenedUrl: shortenedUrl, deletedAt: null },
    });
    expect(updateMock).toHaveBeenCalledWith({
      where: { shortenedUrl: shortenedUrl },
      data: { accessCount: 1, updatedAt: expect.any(Date) },
    });
    expect(result).toEqual({ redirectUrl: urlEntry.originalUrl });
  });

  it('deve lançar NotFoundException se a URL encurtada não for encontrada', async () => {
    const shortenedUrl = 'short404';

    findUniqueMock.mockResolvedValue(null);

    await expect(registerUrlAccess(prisma, shortenedUrl)).rejects.toThrow(
      new NotFoundException('URL encurtada não encontrada!'),
    );

    expect(updateMock).not.toHaveBeenCalled();
  });

  it('deve lidar com erros do Prisma', async () => {
    const shortenedUrl = 'shortError';
    const error = new Error('Erro do Prisma');

    findUniqueMock.mockRejectedValue(error);

    await expect(registerUrlAccess(prisma, shortenedUrl)).rejects.toThrow(
      error,
    );
    expect(updateMock).not.toHaveBeenCalled();
  });
});
