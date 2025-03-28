import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// Importando modulos
import { PrismaModule } from '../../database/orm/prisma/prisma.module';
import { LoggerModule } from '../../helpers/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule, LoggerModule, JwtModule, UsersModule],
})
export class AuthModule {}
