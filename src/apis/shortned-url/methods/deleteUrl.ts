import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/orm/prisma/prisma.service';
import { DeleteUrlDto } from 'src/utils/dtos/shortnedUrls/deleteUrlDto';

export default async function deleteUrl(
  prisma: PrismaService,
  userId: string,
  deleteUrlData: DeleteUrlDto,
) {
  const { shortenedUrlId } = deleteUrlData;

  const url = await prisma.shortenedUrl.findFirst({
    where: {
      id: shortenedUrlId,
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
    where: { id: shortenedUrlId },
    data: {
      deletedAt: new Date(), // Definindo a data de exclusão
      updatedAt: new Date(),
    },
  });
}
