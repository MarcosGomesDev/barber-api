import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type UserAttributes = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
};

@Schema({ timestamps: true })
export class UserModel extends Model<UserAttributes> {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  cpf: string;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
