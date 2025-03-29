import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../../../helpers/logger/logger.service';
import loginUser from '../../methods/loginUser';
import { User } from '@prisma/client';

// Mock das dependências
const mockLoggerService = {
  logInfo: jest.fn(),
};
const mockJwtService = {
  sign: jest.fn().mockReturnValue('mocked_jwt_token'),
};

describe('loginUser', () => {
  it('deve gerar um token JWT corretamente', async () => {
    const mockUser: Partial<User> = {
      id: '123',
      email: 'user@example.com',
    };

    const result = await loginUser(
      mockLoggerService as unknown as LoggerService,
      mockJwtService as unknown as JwtService,
      mockUser,
    );

    expect(mockLoggerService.logInfo).toHaveBeenCalledWith(
      expect.stringContaining(
        `Generating JWT token for user with email: ${mockUser.email}`,
      ),
    );
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      email: mockUser.email,
      sub: mockUser.id,
    });
    expect(result).toEqual({ access_token: 'mocked_jwt_token' });
  });
});
