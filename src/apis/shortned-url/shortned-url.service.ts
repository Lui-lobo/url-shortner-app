// Importando dependências
import { Injectable } from '@nestjs/common';
// Importando serviços
import { PrismaService } from '../../database/orm/prisma/prisma.service';
import { LoggerService } from '../../helpers/logger/logger.service';
// Importando DTOs
import { ShortenUrlDto } from '../../utils/dtos/shortnedUrls/shortenUrl.dto';
import { UpdateUrlDto } from '../../utils/dtos/shortnedUrls/updateUrlDto';
import { DeleteUrlDto } from 'src/utils/dtos/shortnedUrls/deleteUrlDto';
// Importando métodos
import shortenUrl from './methods/shortenUrl';
import registerUrlAccess from './methods/registerUrlAccess';
import deleteUrl from './methods/deleteUrl';
import listUserUrls from './methods/listUserUrls';
import updateUrl from './methods/updateUrl';

@Injectable()
export class ShortenedUrlService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  async shortenUrl(dto: ShortenUrlDto, userAgent: string, userId?: string) {
    return await shortenUrl(
      this.loggerService,
      this.prisma,
      dto,
      userAgent,
      userId,
    );
  }

  async registerAccess(shortenedUrl: string) {
    return await registerUrlAccess(this.prisma, shortenedUrl);
  }

  async updateUrl(
    updateUrlData: UpdateUrlDto,
    userAgent: string,
    userId: string,
  ) {
    return await updateUrl(this.prisma, userAgent, userId, updateUrlData);
  }

  async deleteUrl(deleteUrlData: DeleteUrlDto, userId: string) {
    return await deleteUrl(this.prisma, userId, deleteUrlData);
  }

  async listUserUrls(userId: string) {
    return await listUserUrls(this.prisma, userId);
  }
}
