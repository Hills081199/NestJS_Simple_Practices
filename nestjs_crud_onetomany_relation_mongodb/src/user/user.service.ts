import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User>
    {
        try
        {
            const newUser = await new this.userModel(createUserDto)
            console.log(newUser);
            return newUser.save()
        }

        catch (err)
        {
            throw new BadRequestException("Cannot create user, please check again !");
        }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User>
    {
        try
        {
            const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {new: true});
            return existingUser;
        }

        catch (err)
        {   
            throw new NotFoundException(`Cannot find user with id ${userId}`);
        }
    }

    async getAllUsers() : Promise<User[]>
    {
        try
        {
            const allUsers = await this.userModel.find();
            return allUsers;
        }

        catch (err)
        {
            throw new NotFoundException("Cannot find any user data");
        }
    }

    async getUserById(userId: string) : Promise<User>
    {
        try
        {
            const existingUser = await this.userModel.findById(userId).exec();
            return existingUser;
        }
        catch (err)
        {
            throw new NotFoundException(`Cannot find user with id ${userId}`);
        }
        
    }

    async deleteUserById(userId: string) : Promise<User>
    {
        try
        {
            const deletedUser =  await this.userModel.findByIdAndDelete(userId);
            return deletedUser;
        }

        catch (err)
        {
            throw new NotFoundException(`Cannot find user with id ${userId}`);
        }
    }
}
