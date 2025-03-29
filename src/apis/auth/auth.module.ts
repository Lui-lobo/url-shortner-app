import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// Importando serviços e controllers
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// Importando módulos
import { PrismaModule } from '../../database/orm/prisma/prisma.module';
import { LoggerModule } from '../../helpers/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
// Importando estratégia e guards
import { JwtStrategy } from '../../utils/strategies/auth/jwtStrategy';
import { OptionalJwtAuthGuard } from '../../utils/strategies/auth/optionalJwtAuthGuard';
@Module({
  providers: [
    AuthService,
    JwtStrategy, // Estratégia JWT para autenticação
    OptionalJwtAuthGuard, // Guard opcional para extração de usuário
  ],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    LoggerModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  exports: [JwtModule, OptionalJwtAuthGuard], // Exportando para uso nos controllers
})
export class AuthModule {}
