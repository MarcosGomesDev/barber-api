import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserGatewayInterface } from './user-gateway-interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { UserModel } from '../entities/user.model';
import * as bcrypt from 'bcrypt';

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
    user.password = await this.hasPassword(user.password);

    return this.userModel.create(user);
  }

  async delete(id: string): Promise<HttpException> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userModel.findByIdAndDelete(user.id);
    return new HttpException('Usuário deletado com sucesso', 200);
  }

  private async hasPassword(password: string): Promise<string> {
    const salRounds = 10;
    return await bcrypt.hash(password, salRounds);
  }
}
