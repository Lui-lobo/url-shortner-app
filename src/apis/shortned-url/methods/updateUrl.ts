import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/orm/prisma/prisma.service';
import { UpdateUrlDto } from 'src/utils/dtos/shortnedUrls/updateUrlDto';

export default async function updateUrl(
  prisma: PrismaService,
  userAgent: string,
  userId: string,
  updateUrlData: UpdateUrlDto,
) {
  const { shortnedUrlId, newUrl } = updateUrlData;

  const url = await prisma.shortenedUrl.findFirst({
    where: {
      id: shortnedUrlId,
      userId: userId,
      deletedAt: null, // Garantindo que a URL não foi deletada
    },
  });

  if (!url) {
    throw new NotFoundException(
      'URL não encontrada ou não pertence a este usuário.',
    );
  }

  return await prisma.shortenedUrl.update({
    where: { id: shortnedUrlId },
    data: {
      originalUrl: newUrl,
      updatedAt: new Date(),
      origin: userAgent || 'N/A',
    },
  });
}
