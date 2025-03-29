import { PrismaService } from 'src/database/orm/prisma/prisma.service';

export default async function listUserUrls(
  prisma: PrismaService,
  userId: string,
) {
  return await prisma.shortenedUrl.findMany({
    where: {
      userId: userId,
      deletedAt: null, // Garantindo que estamos pegando apenas URLs ativas
    },
  });
}
