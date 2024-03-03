import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarSchema } from 'src/schemas/car.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [CarService],
  controllers: [CarController]
})
export class CarModule {}
