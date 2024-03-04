import { Body, Controller, HttpStatus, NotFoundException, Post, Put, Get, Delete, Res, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { UserService } from 'src/user/user.service';
import { CreateCarDto } from 'src/dtos/create-car.dto';
import { UpdateCarDto } from 'src/dtos/update-car.dto';

@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService, private readonly userService: UserService) {}

    @Post()
    async createCar(@Res() response, @Body() createCarDto: CreateCarDto)
    {
        // check existed user
        try
        {
            const existedUser = await this.userService.getUserById(createCarDto.userId);
            const newCar = await this.carService.createCar(createCarDto, existedUser);
            return response.status(HttpStatus.CREATED).json({
                message: "New Car created ",
                newCar
            })
        }
        
        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Put('/:car_id')
    async updateCar(@Res() response, @Param('car_id') car_id: string, @Body() updateCarDto: UpdateCarDto)
    {
        try
        {
            const updatedCar = await this.carService.updateCar(car_id, updateCarDto);
            return response.status(HttpStatus.OK).json({
                message : `Car with id ${car_id} updated`,
                updatedCar
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getAllCars(@Res() response)
    {
        try
        {
            const allCars = await this.carService.getAllCars();
            return response.status(HttpStatus.OK).json({
                message: "All cars found ! ",
                allCars,
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:car_id')
    async getCarById(@Res() response, @Param('car_id') car_id: string)
    {
        try
        {
            const car = await this.carService.getCarById(car_id);
            return response.status(HttpStatus.OK).json({
                message: `Car with id ${car_id} found !`,
                car
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:car_id')
    async deleteCarById(@Res() response, @Param('car_id') car_id: string)
    {
        try
        {
            const deletedCar = await this.carService.deleteCar(car_id);
            return response.status(HttpStatus.OK).json({
                message: `Car with id ${car_id} deleted`,
                deletedCar
            })
        }   

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }
}
