import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/NestJS_MongoDB_OneToManyExample'),
    UserModule,
    CarModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
