import { UserGatewayInMemory, UserService } from '@app/users';

describe('UserService', () => {
  let service: UserService;
  let userPersistenceGateway: UserGatewayInMemory;

  beforeEach(() => {
    userPersistenceGateway = new UserGatewayInMemory();
    service = new UserService(userPersistenceGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um usuário', async () => {
    const user = await service.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      cpf: '12345678901',
      phone: '12345678901',
    });

    expect(userPersistenceGateway.user).toEqual(user);
  });

  it('deve retornar erro ao criar um usuário com email já cadastrado', async () => {
    expect(
      service.create({
        name: 'Teste',
        email: 'johndoe@teste.com',
        password: '123456',
        cpf: '12345678901',
        phone: '12345678901',
      }),
    ).rejects.toThrow();
  });

  it('deve retornar um usuário', async () => {
    const user = await service.findById('123asd123asd123asd123asa');

    expect(userPersistenceGateway.user).toEqual(user);
  });

  it('deve retornar erro ao não encontrar um usuário', async () => {
    expect(service.findById('123asd123asd123asd123asb')).rejects.toThrow();
  });

  it('deve retornar todos os usuários', async () => {
    const users = await service.findAll();

    expect(userPersistenceGateway.users).toEqual(users);
  });

  it('deve deletar um usuário', async () => {
    const user = await service.delete('123asd123asd123asd123asa');

    expect('Usuário deletado com sucesso').toEqual(user);
  });

  it('deve retornar erro ao não encontrar um usuário para deletar', async () => {
    expect(service.delete('123asd123asd123asd123asb')).rejects.toThrow();
  });
});
