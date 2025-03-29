// Importando serviços
import { PrismaService } from '../../../database/orm/prisma/prisma.service';
import { LoggerService } from 'src/helpers/logger/logger.service';
// Importando DTOs
import { ShortenUrlDto } from '../../../utils/dtos/shortnedUrls/shortenUrl.dto';
// Importando bibliotecas
import { randomBytes } from 'crypto';
// Importando erros
import { InternalServerErrorException } from '@nestjs/common';
// Importando modelos
import { ShortenedUrl } from '@prisma/client';

// URL base da API
const BASE_URL = process.env.BASE_URL; // Altere para o domínio real em produção

export default async function shortenUrl(
  loggerService: LoggerService,
  prisma: PrismaService,
  dto: ShortenUrlDto,
  userAgent: string,
  userId?: string,
) {
  try {
    // Se tivermos um userId, buscamos se já existe essa URL encurtada ativa para o usuário
    if (userId) {
      loggerService.logInfo(
        `Checando se o usuário de id: ${userId} já encurtou a url: ${dto.url}`,
      );

      const existingShortenedUrl = await prisma.shortenedUrl.findFirst({
        where: {
          originalUrl: dto.url,
          userId: userId,
          deletedAt: null, // Certifica-se de que o URL não foi deletado
        },
      });

      // Se já existe uma URL encurtada ativa, retornamos ela
      if (existingShortenedUrl) {
        loggerService.logInfo('Url previamente encurtada encontrada!');

        return existingShortenedUrl;
      }
    }

    loggerService.logInfo('Iniciando processo de encurtamento de URL!');

    // Gerando o código encurtado
    const shortenedCode = randomBytes(3).toString('base64url');

    // Gerando a URL encurtada completa
    const shortenedUrl = `${BASE_URL}/${shortenedCode}`;

    // Criando a URL encurtada no banco
    const shortenedEntry: ShortenedUrl = await prisma.shortenedUrl.create({
      data: {
        originalUrl: dto.url,
        shortCode: shortenedCode,
        shortenedUrl,
        userId: userId || null,
        origin: userAgent || 'N/A',
      },
    });

    return shortenedEntry;
  } catch (error) {
    loggerService.logError(
      `Erro ao criar URL encurtada, error -> ${JSON.stringify(error)}`,
    );

    throw new InternalServerErrorException(
      `Erro ao criar URL encurtada, error -> ${JSON.stringify(error)}`,
    );
  }
}
