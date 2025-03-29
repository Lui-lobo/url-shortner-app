import { ShortenedUrlController } from './shortned-url.controller';
import { ShortenedUrlService } from './shortned-url.service';
import { ShortenUrlDto } from '../../utils/dtos/shortnedUrls/shortenUrl.dto';
import { RegisterUrlAccessDto } from '../../utils/dtos/shortnedUrls/registerUrlDto';
import { UpdateUrlDto } from '../../utils/dtos/shortnedUrls/updateUrlDto';
import { DeleteUrlDto } from '../../utils/dtos/shortnedUrls/deleteUrlDto';

describe('ShortenedUrlController', () => {
  let shortenedUrlController: ShortenedUrlController;
  let shortenedUrlService: ShortenedUrlService;

  beforeEach(() => {
    shortenedUrlService = {
      shortenUrl: jest.fn(),
      registerAccess: jest.fn(),
      listUserUrls: jest.fn(),
      updateUrl: jest.fn(),
      deleteUrl: jest.fn(),
    } as any;
    shortenedUrlController = new ShortenedUrlController(shortenedUrlService);
  });

  it('should be defined', () => {
    expect(shortenedUrlController).toBeDefined();
  });

  describe('shortenUrl', () => {
    it('should call shortenedUrlService.shortenUrl with correct parameters', async () => {
      const dto: ShortenUrlDto = { url: 'https://example.com' };
      const userAgent = 'Chrome';
      const userId = 'user123';

      await shortenedUrlController.shortenUrl(dto, userAgent, userId);

      expect(shortenedUrlService.shortenUrl).toHaveBeenCalledWith(
        dto,
        userAgent,
        userId,
      );
    });
  });

  describe('registerAccess', () => {
    it('should call shortenedUrlService.registerAccess with correct parameters', async () => {
      const urlObject: RegisterUrlAccessDto = { shortenedUrl: 'short123' };

      await shortenedUrlController.registerAccess(urlObject);

      expect(shortenedUrlService.registerAccess).toHaveBeenCalledWith(
        urlObject.shortenedUrl,
      );
    });
  });

  describe('listUserUrls', () => {
    it('should call shortenedUrlService.listUserUrls with correct parameters', async () => {
      const userId = 'user123';

      await shortenedUrlController.listUserUrls(userId);

      expect(shortenedUrlService.listUserUrls).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateUrl', () => {
    it('should call shortenedUrlService.updateUrl with correct parameters', async () => {
      const updateUrlData: UpdateUrlDto = {
        shortnedUrlId: 'url123',
        newUrl: 'https://new-example.com',
      };
      const userAgent = 'Chrome';
      const userId = 'user123';

      await shortenedUrlController.updateUrl(updateUrlData, userAgent, userId);

      expect(shortenedUrlService.updateUrl).toHaveBeenCalledWith(
        updateUrlData,
        userAgent,
        userId,
      );
    });
  });

  describe('deleteUrl', () => {
    it('should call shortenedUrlService.deleteUrl with correct parameters', async () => {
      const deleteUrlData: DeleteUrlDto = { shortenedUrlId: 'url123' };
      const userId = 'user123';

      await shortenedUrlController.deleteUrl(deleteUrlData, userId);

      expect(shortenedUrlService.deleteUrl).toHaveBeenCalledWith(
        deleteUrlData,
        userId,
      );
    });
  });
});
