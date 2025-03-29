import { ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

export function DeleteUrl() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBearerAuth()(target, key, descriptor);
    ApiQuery({
      name: 'shortenedUrlId',
      required: true,
      description: 'Identificador da url encurtada a ser deletada',
      example: 'cm8udnezv0001nw1cn8ipya4j',
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'A url foi encurtada com sucesso!',
      schema: {
        example: {
          id: 'cm8udnezv0001nw1cn8ipya4j',
          originalUrl: 'https://www.youtube.com/',
          shortCode: 'aan0',
          createdAt: '2025-03-29T15:39:41.604Z',
          userId: '1de64037-0d31-4ea4-93c5-35fb62967e8b',
          updatedAt: '2025-03-29T19:02:53.429Z',
          deletedAt: '2025-03-29T19:02:53.426Z',
          shortenedUrl: 'http://localhost/aan0',
          accessCount: 5,
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'Houve um erro ao tentar criar a url encurtada!',
      schema: {
        example: {
          message: 'URL não encontrada ou não pertence a este usuário.',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    })(target, key, descriptor);
  };
}
