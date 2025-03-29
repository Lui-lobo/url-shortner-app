// Importando dependências
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ShortenedUrlService } from './shortned-url.service';
// Importando DTOs
import { ShortenUrlDto } from '../../utils/dtos/shortnedUrls/shortenUrl.dto';
import { RegisterUrlAccessDto } from '../../utils/dtos/shortnedUrls/registerUrlDto';
import { UpdateUrlDto } from 'src/utils/dtos/shortnedUrls/updateUrlDto';
import { DeleteUrlDto } from 'src/utils/dtos/shortnedUrls/deleteUrlDto';
// Importando guards
import { JwtAuthGuard } from '../../utils/guards/auth/jwtAuthGuard';
import { OptionalJwtAuthGuard } from '../../utils/strategies/auth/optionalJwtAuthGuard';
// Importando decorators
import { GetUser } from '../../utils/decorators/auth/getUserDecorator';
import { UserAgent } from '../../utils/decorators/requestInfo/userAgentDecorator';

@Controller('shortenedUrls')
export class ShortenedUrlController {
  constructor(private readonly shortenedUrlService: ShortenedUrlService) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  async shortenUrl(
    @Body() dto: ShortenUrlDto,
    @UserAgent() userAgent: string,
    @GetUser('userId') userId?: string,
  ) {
    return this.shortenedUrlService.shortenUrl(dto, userAgent, userId);
  }

  @Get('registerAccess/')
  async registerAccess(@Query() urlObject: RegisterUrlAccessDto) {
    const { shortenedUrl } = urlObject;
    return this.shortenedUrlService.registerAccess(shortenedUrl);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async listUserUrls(@GetUser('userId') userId: string) {
    return this.shortenedUrlService.listUserUrls(userId);
  }

  @Put('')
  @UseGuards(JwtAuthGuard)
  async updateUrl(
    @Body() updateUrlData: UpdateUrlDto,
    @UserAgent() userAgent: string,
    @GetUser('userId') userId: string,
  ) {
    return this.shortenedUrlService.updateUrl(updateUrlData, userAgent, userId);
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  async deleteUrl(
    @Query() deleteUrlData: DeleteUrlDto,
    @GetUser('userId') userId: string,
  ) {
    return this.shortenedUrlService.deleteUrl(deleteUrlData, userId);
  }
}
