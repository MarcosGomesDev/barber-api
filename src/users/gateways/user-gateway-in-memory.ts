import { HttpException, NotFoundException } from '@nestjs/common';
import { User } from '../entities';
import { UserGatewayInterface } from './user-gateway-interface';
import * as bcrypt from 'bcrypt';

export class UserGatewayInMemory implements UserGatewayInterface {
  users: User[] = [
    {
      id: '123asd123asd123asd123asa',
      name: 'Teste',
      email: 'johndoe@teste.com',
      password: '123456',
      cpf: '12345678901',
      phone: '12345678901',
    },
  ];

  user: User = null;

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    this.user = user;

    return user;
  }

  async create(user: User): Promise<User> {
    const existUser = await this.findByEmail(user.email);

    if (existUser) {
      throw new HttpException('Email já cadastrado', 400);
    }

    user.password = await this.hasPassword(user.password);

    user.id = '123asd123asd123asd123asd';

    user = new User(user);

    this.users.push(user);

    this.user = user;

    return user;
  }

  async delete(id: string): Promise<string> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    this.users = this.users.filter((user) => user.id !== id);

    this.user = null;

    return 'Usuário deletado com sucesso';
  }

  private async hasPassword(password: string): Promise<string> {
    const salRounds = 10;
    return await bcrypt.hash(password, salRounds);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
