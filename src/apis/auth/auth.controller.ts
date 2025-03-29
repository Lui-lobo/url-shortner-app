import { Controller, Post, Body } from '@nestjs/common';
// Importando serviços
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
// Importando DTOs
import { ValidateUserDto } from '../../utils/dtos/auth/validateUserDto';
import { CreateUserDto } from '../../utils/dtos/user/createUserDto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Post('login')
  async login(@Body() userData: ValidateUserDto) {
    const user = await this.authService.validateUser(userData);
    return this.authService.login(user);
  }
}
