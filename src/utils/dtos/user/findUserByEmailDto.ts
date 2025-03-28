import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class FindUserByEmailDto {
  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
