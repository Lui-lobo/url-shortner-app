import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function RegisterUser() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBody({
      required: true,
      schema: {
        example: {
          email: 'luizteste@teste2.com',
          password: '12345678',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'O usuário foi criado com sucesso!',
      schema: {
        example: {
          id: '44e40cf9-5285-45bc-8902-c22a490d4ce4',
          email: 'luizteste@teste2.com',
          password:
            '$2b$10$9zrLCCtjEtohnG7Lhc4fpeaJBfMWczwDZK6.pbJpi57QvPIJzgSLi',
          createdAt: '2025-03-29T20:00:08.846Z',
          updatedAt: '2025-03-29T20:00:08.846Z',
          deletedAt: null,
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'O email enviado já está em uso!',
      schema: {
        example: {
          message: 'Email already in use',
          error: 'Conflict',
          statusCode: 409,
        },
      },
    })(target, key, descriptor);
  };
}
