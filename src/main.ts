import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Imports comuns do nestJs
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipe global utilizado para criar validações de dados baseadas nos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades desconhecidas automaticamente
      forbidNonWhitelisted: true, // Retorna erro se propriedades não reconhecidas forem enviadas
      transform: true, // Transforma os dados de entrada conforme os tipos do DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
