import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { CarSchema } from 'src/schemas/car.schema';
import { CarService } from 'src/car/car.service';
import { CarController } from 'src/car/car.controller';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      },
      {
        name: 'Car',
        schema: CarSchema
      }
    ]),
  ],
  controllers: [UserController, CarController],
  providers: [UserService, CarService]
})
export class UserModule {}
