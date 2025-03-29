import { IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsUrl()
  url: string;
}
