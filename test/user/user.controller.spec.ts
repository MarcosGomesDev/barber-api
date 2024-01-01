import {
  User,
  UserController,
  UserGatewayInMemory,
  UserService,
} from '@app/users';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserGatewayInMemory,
        {
          provide: 'UserPersistenceGateway',
          useClass: UserGatewayInMemory,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result: User[] = [];

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.findAll()).toBe(result);
  });

  it('should return an user', async () => {
    const result = new User({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      cpf: '12345678901',
      phone: '12345678901',
    });

    jest
      .spyOn(service, 'findById')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.findOne(result.id)).toBe(result);
  });

  it('should create an user', async () => {
    const result = new User({
      name: 'Teste',
      email: 'johndoe@teste.com',
      password: '123456',
      cpf: '12345678901',
      phone: '12345678901',
    });

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.create(result)).toBe(result);
  });

  it('should delete an user', async () => {
    const result = '123asd123asd123asd123asd';

    jest
      .spyOn(service, 'delete')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.delete(result)).toBe(result);
  });
});
