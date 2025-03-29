import { Injectable } from '@nestjs/common';
// Importando serviços
import { LoggerService } from 'src/helpers/logger/logger.service';
//import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/database/orm/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
// Importando DTOs
import { ValidateUserDto } from '../../utils/dtos/auth/validateUserDto';
// Importando modelo de usuário do prisma
import { User } from '@prisma/client';
// Métodos isolados
import validateUser from './methods/validateUser';
import loginUser from './methods/loginUser';

@Injectable()
export class AuthService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userData: ValidateUserDto): Promise<Partial<User>> {
    return await validateUser(this.loggerService, this.prismaService, userData);
  }

  async login(user: Partial<User>) {
    return await loginUser(this.loggerService, this.jwtService, user);
  }
}
