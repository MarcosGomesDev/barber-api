import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto';
import { User } from './entities';
import { UserGatewayInterface } from './gateways';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserPersistenceGateway')
    private readonly userPersistenceGateway: UserGatewayInterface,
  ) {}

  async findAll() {
    return await this.userPersistenceGateway.findAll();
  }

  async findById(id: string) {
    const user = await this.userPersistenceGateway.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async create(createUserDTO: CreateUserDTO) {
    const user = new User(createUserDTO);

    await this.userPersistenceGateway.create(user);

    return user;
  }

  async delete(id: string) {
    return await this.userPersistenceGateway.delete(id);
  }
}
