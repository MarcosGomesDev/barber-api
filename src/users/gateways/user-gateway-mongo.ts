import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserGatewayInterface } from './user-gateway-interface';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserModel } from '../entities';

@Injectable()
export class UserGatewayMongo implements UserGatewayInterface {
  constructor(
    @InjectModel('User')
    private userModel: typeof UserModel,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users.map((user) => new User(user));
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return new User(user);
  }

  async create(user: User): Promise<User> {
    const existUser = await this.findByEmail(user.email);

    if (existUser) {
      throw new HttpException('Email já cadastrado', 400);
    }

    user.password = await this.hasPassword(user.password);

    return this.userModel.create(user);
  }

  async delete(id: string): Promise<string> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userModel.findByIdAndDelete(user.id);
    return 'Usuário deletado com sucesso';
  }

  private async hasPassword(password: string): Promise<string> {
    const salRounds = 10;
    return await bcrypt.hash(password, salRounds);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
