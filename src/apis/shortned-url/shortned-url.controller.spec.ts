import { Test, TestingModule } from '@nestjs/testing';
import { ShortnedUrlController } from './shortned-url.controller';

describe('ShortnedUrlController', () => {
  let controller: ShortnedUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortnedUrlController],
    }).compile();

    controller = module.get<ShortnedUrlController>(ShortnedUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
