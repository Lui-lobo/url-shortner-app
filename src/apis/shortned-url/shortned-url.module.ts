import { Module } from '@nestjs/common';
import { ShortenedUrlService } from './shortned-url.service';
import { ShortenedUrlController } from './shortned-url.controller';
import { PrismaModule } from '../../database/orm/prisma/prisma.module';
import { LoggerModule } from '../../helpers/logger/logger.module';

@Module({
  providers: [ShortenedUrlService],
  controllers: [ShortenedUrlController],
  imports: [PrismaModule, LoggerModule],
})
export class ShortnedUrlModule {}
