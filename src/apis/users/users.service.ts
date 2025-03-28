import { Injectable } from '@nestjs/common';
// Importando serviços
import { PrismaService } from '../../database/orm/prisma/prisma.service';
import { LoggerService } from '../..//helpers/logger/logger.service';
// Importando DTOs
import { CreateUserDto } from '../../utils/dtos/user/createUserDto';
import { FindUserByEmailDto } from '../..//utils/dtos/user/findUserByEmailDto';
// Métodos isolados
import createUser from './methods/createUser';
import findUserByEmail from './methods/findUserByEmail';
// Importando modelo do usuário
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    return await createUser(this.loggerService, this.prisma, userData);
  }

  async findByEmail(userEmail: FindUserByEmailDto): Promise<User | null> {
    return await findUserByEmail(this.loggerService, this.prisma, userEmail);
  }
}
