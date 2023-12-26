import { User } from '../entities/user.entity';

export interface UserGatewayInterface {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  delete(id: string): Promise<any>;
}
