import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export function listUserUrls() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBearerAuth()(target, key, descriptor);
    ApiResponse({
      status: 1,
      description: 'As urls encurtadas do usuário foram encontradas!',
      schema: {
        example: [
          {
            id: 'cm8udf9an0001nw2ouoxz15qn',
            originalUrl:
              'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
            shortCode: 'rWFz',
            createdAt: '2025-03-29T15:33:20.975Z',
            userId: '1de64037-0d31-4ea4-93c5-35fb62967e8b',
            updatedAt: '2025-03-29T14:56:20.439Z',
            deletedAt: null,
            shortenedUrl: 'http://localhost/rWFz',
            origin: 'N/A',
            accessCount: 0,
          },
          {
            id: 'cm8ulr5cq0001nwrg7lg2uqc0',
            originalUrl:
              'https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal',
            shortCode: 'mxp1',
            createdAt: '2025-03-29T19:26:32.666Z',
            userId: '1de64037-0d31-4ea4-93c5-35fb62967e8b',
            updatedAt: '2025-03-29T21:01:59.504Z',
            deletedAt: null,
            shortenedUrl: 'http://localhost/mxp1',
            origin: 'PostmanRuntime/7.43.3',
            accessCount: 1,
          },
        ],
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'Usuário não possuí urls encurtadas a serem listadas!',
      schema: {
        example: [],
      },
    })(target, key, descriptor);
  };
}
