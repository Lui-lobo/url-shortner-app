import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger('Application');

  logRequest(method: string, url: string, userAgent: string) {
    this.logger.log(`${method} ${url} - User-Agent: ${userAgent}`);
  }

  logInfo(message: string) {
    this.logger.log(`${message}`);
  }

  logError(message: string, error?: any) {
    this.logger.error(`${message}`, error ? JSON.stringify(error) : '');
  }
}
