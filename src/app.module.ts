import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './apis/users/users.module';
import { PrismaService } from './database/orm/prisma/prisma.service';
import { PrismaModule } from './database/orm/prisma/prisma.module';
// Importando middlewares globais
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';
// Importando serviços
import { LoggerService } from './helpers/logger/logger.service';
// Importando modulos
import { LoggerModule } from './helpers/logger/logger.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, LoggerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
