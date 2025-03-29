import { ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

export function ShortUrl() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBearerAuth()(target, key, descriptor);
    ApiBody({
      required: true,
      schema: {
        example: {
          url: 'https://teddy360.com.br',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'A url foi encurtada com sucesso!',
      schema: {
        example: {
          id: 'cm8ulr5cq0001nwrg7lg2uqc0',
          originalUrl: 'https://teddy360.com.br',
          shortCode: 'mxp1',
          createdAt: '2025-03-29T19:26:32.666Z',
          userId: '1de64037-0d31-4ea4-93c5-35fb62967e8b',
          updatedAt: '2025-03-29T19:26:32.666Z',
          deletedAt: null,
          shortenedUrl: 'http://localhost/mxp1',
          origin: 'PostmanRuntime/7.43.3',
          accessCount: 0,
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'Houve um erro ao tentar criar a url encurtada!',
      schema: {
        example: {
          message:
            'Erro ao criar URL encurtada, error -> ${JSON.stringify(error)}',
          error: 'Internal Exception Error',
          statusCode: 500,
        },
      },
    })(target, key, descriptor);
  };
}
