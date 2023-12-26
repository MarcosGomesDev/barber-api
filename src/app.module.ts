import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      dbName: 'barber',
      autoCreate: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
