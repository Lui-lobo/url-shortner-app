import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/database/orm/prisma/prisma.module';
// Importando Modulos
import { LoggerModule } from 'src/helpers/logger/logger.module';
@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [PrismaModule, LoggerModule],
  exports: [UsersService],
})
export class UsersModule {}
