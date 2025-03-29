import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ValidateUserDto } from '../../utils/dtos/auth/validateUserDto';
import { CreateUserDto } from '../../utils/dtos/user/createUserDto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('deve registrar um novo usuário e retornar os dados', async () => {
      const userDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const createdUser = {
        id: '1',
        email: userDto.email,
        password: userDto.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(usersService, 'create').mockResolvedValueOnce(createdUser);

      const result = await authController.register(userDto);
      expect(result).toEqual(createdUser);
      expect(usersService.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('login', () => {
    it('deve autenticar um usuário e retornar o token', async () => {
      const loginDto: ValidateUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: '1',
        email: loginDto.email,
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const token = { access_token: 'fake-jwt-token' };

      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(user);
      jest.spyOn(authService, 'login').mockResolvedValueOnce(token);

      const result = await authController.login(loginDto);
      expect(result).toEqual(token);
      expect(authService.validateUser).toHaveBeenCalledWith(loginDto);
      expect(authService.login).toHaveBeenCalledWith(user);
    });

    it('deve lançar UnauthorizedException se as credenciais forem inválidas', async () => {
      const loginDto: ValidateUserDto = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };

      jest
        .spyOn(authService, 'validateUser')
        .mockRejectedValueOnce(new UnauthorizedException());

      await expect(authController.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(authService.validateUser).toHaveBeenCalledWith(loginDto);
      expect(authService.login).not.toHaveBeenCalled();
    });
  });
});
