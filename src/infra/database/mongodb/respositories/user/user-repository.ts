import { UserRepositoryInterface } from '@app/data/protocols/db/user/user-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../../models/user/user.model';
import { Model } from 'mongoose';
import { User } from '@app/domain/user/user';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userCollection: Model<UserModel>,
  ) {}

  async create(data: User): Promise<UserModel> {
    const user = new this.userCollection(data);

    return user.save();
  }

  async find(query: any): Promise<UserModel[]> {
    return await this.userCollection.find({ query }, { _v: false });
  }

  async findById(id: string): Promise<UserModel> {
    return await this.userCollection.findById(id, { _v: false });
  }

  async update(id: string, data: User): Promise<UserModel> {
    return await this.userCollection.findByIdAndUpdate({
      _id: { $eq: id },
      $set: data,
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    await this.userCollection.deleteOne({ _id: { $eq: id } });
  }
}
