import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../database/orm/prisma/prisma.module';
// Importando Modulos
import { LoggerModule } from '../../helpers/logger/logger.module';
@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [PrismaModule, LoggerModule],
  exports: [UsersService],
})
export class UsersModule {}
