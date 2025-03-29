import { ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

export function UpdateUrl() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBearerAuth()(target, key, descriptor);
    ApiBody({
      required: true,
      schema: {
        example: {
          shortnedUrlId: 'cm8ulr5cq0001nwrg7lg2uqc0',
          newUrl:
            'https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'A url original foi atualizada com sucesso!',
      schema: {
        example: {
          id: 'cm8ulr5cq0001nwrg7lg2uqc0',
          originalUrl:
            'https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal',
          shortCode: 'mxp1',
          createdAt: '2025-03-29T19:26:32.666Z',
          userId: '1de64037-0d31-4ea4-93c5-35fb62967e8b',
          updatedAt: '2025-03-29T19:31:09.352Z',
          deletedAt: null,
          shortenedUrl: 'http://localhost/mxp1',
          origin: 'PostmanRuntime/7.43.3',
          accessCount: 0,
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description:
        'Não foi possível encontrar ou atualizar o identificador de url encurtado enviada',
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
