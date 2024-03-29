import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserGatewayMongo } from './gateways';
import { UserSchema } from './entities';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    UserGatewayMongo,
    {
      provide: 'UserPersistenceGateway',
      useClass: UserGatewayMongo,
    },
  ],
})
export class UserModule {}
