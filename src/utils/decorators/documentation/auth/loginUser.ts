import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function LoginUser() {
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
      description: 'O usuário foi autenticado com sucesso!',
      schema: {
        example: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXp0ZXN0ZUB0ZXN0ZTIuY29tIiwic3ViIjoiNDRlNDBjZjktNTI4NS00NWJjLTg5MDItYzIyYTQ5MGQ0Y2U0IiwiaWF0IjoxNzQzMjc4NzU2LCJleHAiOjE3NDMyODIzNTZ9.51Jw-8xJ1o8BXBcftSaVRdCe5MDpEzH66EzOd4jggeY',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'Credenciais invalidas!',
      schema: {
        example: {
          message: 'Invalid credentials',
          error: 'Unauthorized',
          statusCode: 401,
        },
      },
    })(target, key, descriptor);
  };
}
