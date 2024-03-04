import { Body, Controller, Res, Post, Put, Get, Delete, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { response } from 'express';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { CarService } from 'src/car/car.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly carService: CarService) {}

    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto)
    {
        try
        {
            const newUser = await this.userService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: "New User has been created successfully",
                newUser
            });
        }

        catch (err)
        {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error : user not created",
                error: "Bad Request"
            });
        }
    }

    @Put('/:id')
    async updateUser(@Res() response, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto)
    {
        try
        {
            const existedUser = await this.userService.updateUser(userId, updateUserDto);
            return response.status(HttpStatus.OK).json({
                message: `User with id ${userId} has been updated successfully`,
                existedUser,
            });
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }   
    }

    @Get('/all_users')
    async getAllUsers(@Res() response)
    {
        try
        {
            const allUsers = await this.userService.getAllUsers();
            return response.status(HttpStatus.OK).json({
                message : "All users found !",
                allUsers
            });
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getUserById(@Res() response, @Param('id') userId: string)
    {
        try
        {
            const existingUser = await this.userService.getUserById(userId);
            return response.status(HttpStatus.OK).json({
                message: `User with id ${userId} existed !`,
                existingUser
            }); 

        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id/car')
    async getCarByUserId(@Res() response, @Param('id') userId: string)
    {
        try
        {
            const existingUser = await this.userService.getUserById(userId);
            if (existingUser)
            {
                const carsByUserId = await this.carService.getCarByUserId(userId);
                return response.status(HttpStatus.OK).json({
                    message: `Cars with user id ${userId} found !`,
                    carsByUserId,
                })
            }
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteUserById(@Res() response, @Param('id') userId: string)
    {
        try
        {
            const deletedUser = await this.userService.deleteUserById(userId);
            await this.carService.deleteCarByUserId(userId);
            return response.status(HttpStatus.OK).json({
                message: `User with id ${userId} deleted !`,
                deletedUser,
            });
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }
}
