import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User>
    {
        try
        {
            const newUser = await new this.userModel(createUserDto)
            return newUser.save()
        }

        catch (err)
        {
            throw new BadRequestException("Cannot create user, please check again !");
        }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User>
    {
        const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {new: true});
        if (!existingUser)
        {
            throw new NotFoundException(`Cannot find user with id ${userId}`);
        }
        return existingUser;
    }

    async getAllUsers() : Promise<User[]>
    {
        const allUsers = await this.userModel.find();
        if (!allUsers  || allUsers.length == 0)
        {
            throw new NotFoundException("Cannot find any user data");
        }
        return allUsers;
    }

    async getUserById(userId: string) : Promise<User>
    {
        try
        {
            const existingUser = await this.userModel.findById(userId).exec();
            if (!existingUser)
            {
                throw new NotFoundException(`Cannot find user with id ${userId}`);
            }
            return existingUser;
        }

        catch (err)
        {
            throw new BadRequestException(`Cannot find user with id ${userId} or your request is bad, please check again`);
        }
        
        
    }

    async deleteUserById(userId: string) : Promise<User>
    {

        const deletedUser =  await this.userModel.findByIdAndDelete(userId);
        if (!deletedUser)
        {
            throw new NotFoundException(`Cannot find user with id ${userId}`);
        }
        return deletedUser;
    }
}
