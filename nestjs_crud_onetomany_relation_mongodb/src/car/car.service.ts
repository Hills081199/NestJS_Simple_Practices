import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCarDto } from 'src/dtos/create-car.dto';
import { UpdateCarDto } from 'src/dtos/update-car.dto';
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

    async updateCar(carId: string, updateCarDto: UpdateCarDto)
    {
        try
        {
            const updatedCar = await this.carModel.findByIdAndUpdate(carId, updateCarDto, {new :true});
            if (!updatedCar)
            {
                throw new NotFoundException(`Cannot find car with id ${carId}`);
            }
    
            return updatedCar;
        }

        catch (err)
        {
            throw new BadRequestException(`Cannot find car with id ${carId} or your request is bad, please check again`);
        }
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
            const existedCar = (await this.carModel.findById(carId).exec()).populate('user');
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

    async getCarByUserId(userId: string) : Promise<Car[]>
    {
        try
        {
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const exstedCarsByUserId = await this.carModel.find({ user: userObjectId })
            return exstedCarsByUserId;
        }

        catch (err)
        {
            throw new NotFoundException(`Cannot find car data for user id : ${userId}`);
        }
    }

    async deleteCar(carId: string) : Promise<Car>
    {
        try
        {
            const deletedCar = await this.carModel.findByIdAndDelete(carId);
            if (!deletedCar)
            {
                throw new NotFoundException(`Cannot find car with id ${carId} to delete !`);
            }
            return deletedCar
        }

        catch (err)
        {
            throw new BadRequestException(`Cannot find car with id ${carId} or your request is bad, please check again`);
        }
    }

    async deleteCarByUserId(userId: string) : Promise<void>
    {
        try
        {
            const userObjectId = new mongoose.Types.ObjectId(userId);
            await this.carModel.deleteMany({user: userObjectId}).exec();
            // if (!deletedCarsByUserId || deletedCarsByUserId.length == 0)
            // {
            //     throw new NotFoundException(`Not found any cars for user id : ${userId} to delete !`);
            // }
        }

        catch (err)
        {
            throw new NotFoundException
        }
    }
}
