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
// Importando decoradores do swagger
import { ApiOperation } from '@nestjs/swagger';
// importando decoradores de documentação
import { ShortUrl } from '../../utils/decorators/documentation/shortenedUrl/shortUrl';
import { RegisterAccess } from '../../utils/decorators/documentation/shortenedUrl/registerAccess';
import { listUserUrls } from '../../utils/decorators/documentation/shortenedUrl/listsUserUrls';
import { UpdateUrl } from '../../utils/decorators/documentation/shortenedUrl/updateUrl';
import { DeleteUrl } from '../../utils/decorators/documentation/shortenedUrl/deleteUrl';

@Controller('shortenedUrls')
export class ShortenedUrlController {
  constructor(private readonly shortenedUrlService: ShortenedUrlService) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary: 'Encurta uma url para usuários autenticados e não autenticados',
  })
  @ShortUrl()
  async shortenUrl(
    @Body() dto: ShortenUrlDto,
    @UserAgent() userAgent: string,
    @GetUser('userId') userId?: string,
  ) {
    return this.shortenedUrlService.shortenUrl(dto, userAgent, userId);
  }

  @Get('registerAccess/')
  @ApiOperation({
    summary:
      'Realiza o acesso a uma url encurtada e aumenta a quantidade de acessos!',
  })
  @RegisterAccess()
  async registerAccess(@Query() urlObject: RegisterUrlAccessDto) {
    const { shortenedUrl } = urlObject;
    return this.shortenedUrlService.registerAccess(shortenedUrl);
  }

  @Get('list')
  @ApiOperation({
    summary:
      'Lista todas as URLs encurtadas geradas por um usuário autenticado!',
  })
  @listUserUrls()
  @UseGuards(JwtAuthGuard)
  async listUserUrls(@GetUser('userId') userId: string) {
    return this.shortenedUrlService.listUserUrls(userId);
  }

  @Put('')
  @ApiOperation({
    summary: 'Atualiza a url original no qual a url encurtada está apontando!',
  })
  @UpdateUrl()
  @UseGuards(JwtAuthGuard)
  async updateUrl(
    @Body() updateUrlData: UpdateUrlDto,
    @UserAgent() userAgent: string,
    @GetUser('userId') userId: string,
  ) {
    return this.shortenedUrlService.updateUrl(updateUrlData, userAgent, userId);
  }

  @Delete('')
  @ApiOperation({
    summary: 'Realiza a exclusão lógica de uma url encurtada de um usuário',
  })
  @DeleteUrl()
  @UseGuards(JwtAuthGuard)
  async deleteUrl(
    @Query() deleteUrlData: DeleteUrlDto,
    @GetUser('userId') userId: string,
  ) {
    return this.shortenedUrlService.deleteUrl(deleteUrlData, userId);
  }
}
