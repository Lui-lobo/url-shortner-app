import { Controller, Post, Body } from '@nestjs/common';
// Importando serviços
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
// Importando DTOs
import { ValidateUserDto } from '../../utils/dtos/auth/validateUserDto';
import { CreateUserDto } from '../../utils/dtos/user/createUserDto';
// Importando decoradores do swagger
import { ApiOperation } from '@nestjs/swagger';
// importando decoradores de documentação
import { RegisterUser } from '../../utils/decorators/documentation/auth/registerUser';
import { LoginUser } from '../../utils/decorators/documentation/auth/loginUser';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário no sistema' })
  @RegisterUser()
  async register(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Realiza a autenticação de um usuário no sistema' })
  @LoginUser()
  async login(@Body() userData: ValidateUserDto) {
    const user = await this.authService.validateUser(userData);
    return this.authService.login(user);
  }
}
