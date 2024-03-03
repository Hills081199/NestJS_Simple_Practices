import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from 'src/dtos/create-car.dto';
import { Car, CarDocument } from 'src/schemas/car.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class CarService {
    constructor(@InjectModel(Car.name) private readonly carModel : Model<CarDocument>){}

    async createCar(createCarDto: CreateCarDto, user : User) : Promise<Car>
    {
        console.log(createCarDto);
        console.log(user);
        const newCar = await new this.carModel({
            ...createCarDto,
            user: user
        })

        if (!newCar)
        {
            throw new BadRequestException("Cannot create a new car ,please check again");
        }
        return newCar.save();
    }

    async getAllCars() : Promise<Car[]>
    {
        const allCars = await this.carModel.find().populate('user');
        if (!allCars || allCars.length == 0)
        {
            throw new NotFoundException("Cannot find any car data");
        }

        return allCars;
    }

    async getCarById(carId: string) : Promise<Car>
    {
        try
        {
            const existedCar = await this.carModel.findById(carId).exec();
            if (!existedCar)
            {
                throw new NotFoundException(`Cannot find car with id ${carId}`);
            }
            return existedCar;
        }
        
        catch (err)
        {
            throw new BadRequestException(`Cannot find car with id ${carId} or your request is bad, please check again`);
        }
    }

    async deleteCar(carId: string) : Promise<Car>
    {
        
    }
}
