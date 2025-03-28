import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
