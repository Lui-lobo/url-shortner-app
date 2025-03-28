import { Controller, Post, Body } from '@nestjs/common';
// Importando serviços
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
// Importando DTOs
import { ValidateUserDto } from '../../utils/dtos/auth/validateUserDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() userData: ValidateUserDto) {
    const user = await this.authService.validateUser(userData);
    return this.authService.login(user);
  }
}
