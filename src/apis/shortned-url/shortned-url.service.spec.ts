import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlService } from './shortned-url.service';

describe('ShortnedUrlService', () => {
  let service: ShortenedUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenedUrlService],
    }).compile();

    service = module.get<ShortenedUrlService>(ShortenedUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
