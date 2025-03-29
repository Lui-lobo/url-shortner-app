import { PrismaService } from '../../../database/orm/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export default async function registerUrlAccess(
  prisma: PrismaService,
  shortenedUrl: string,
) {
  const urlEntry = await prisma.shortenedUrl.findUnique({
    where: { shortenedUrl: shortenedUrl, deletedAt: null },
  });

  if (!urlEntry) {
    throw new NotFoundException('URL encurtada não encontrada!');
  }

  // Atualizando o campo de contagem de acessos
  if (urlEntry && !urlEntry.deletedAt) {
    // Incrementa o contador de acessos
    await prisma.shortenedUrl.update({
      where: { shortenedUrl },
      data: {
        accessCount: urlEntry.accessCount + 1,
        updatedAt: new Date(),
      },
    });
  }

  return { redirectUrl: urlEntry.originalUrl };
}
