import { ApiResponse, ApiQuery } from '@nestjs/swagger';

export function RegisterAccess() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiQuery({
      name: 'shortenedUrl',
      required: true,
      description: 'Url encurtada a ser acessada',
      example: 'http://localhost/aan0',
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'A url foi encontrada com sucesso!',
      schema: {
        example: {
          redirectUrl:
            'https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'A url encurtada enviada não foi encontrada nos registros!',
      schema: {
        example: {
          message: 'URL encurtada não encontrada!',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    })(target, key, descriptor);
  };
}
