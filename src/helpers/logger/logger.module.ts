import { Module } from '@nestjs/common';
// Importando serviços
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService], // Exportamos o LoggerService para ser usado em outros módulos
})
export class LoggerModule {}
