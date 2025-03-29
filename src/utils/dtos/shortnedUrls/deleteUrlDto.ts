// DTO para registrar acesso a URL encurtada
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUrlDto {
  @IsString()
  @IsNotEmpty()
  shortenedUrlId: string;
}
