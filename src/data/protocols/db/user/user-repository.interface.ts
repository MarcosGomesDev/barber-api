import { User } from '@app/domain/user/user';
import { UserModel } from '@app/infra/database/mongodb/models/user/user.model';

export interface UserRepositoryInterface {
  create: (data: User) => Promise<UserModel>;
  find: (query: any) => Promise<UserModel[]>;
  findById: (id: string) => Promise<UserModel>;
  update: (id: string, data: User) => Promise<UserModel>;
  delete: (id: string) => Promise<void>;
}
