// DTO para registrar acesso a URL encurtada
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUrlAccessDto {
  @IsString()
  @IsNotEmpty()
  shortenedUrl: string;
}
