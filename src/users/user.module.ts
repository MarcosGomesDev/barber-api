import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.model';
import { UserGatewayMongo } from './gateways/user-gateway-mongo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
