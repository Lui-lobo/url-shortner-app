import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUrlDto {
  @IsString()
  @IsNotEmpty()
  shortnedUrlId: string;

  @IsString()
  @IsNotEmpty()
  newUrl: string;
}
