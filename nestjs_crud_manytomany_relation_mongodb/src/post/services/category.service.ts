import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/dtos/create-category.dto';
import { Category, CategoryDocument } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel : Model<CategoryDocument>) {}

    async createCategory(createCategoryDto: CreateCategoryDto) : Promise<Category>
    {

        const newCategory = new this.categoryModel(createCategoryDto);
        if (!newCategory)
        {
            throw new BadRequestException("Cannot create a new category ,please check again !");
        }
        return await newCategory.save();
    }

    async getAllCategories() : Promise<Category[]>
    {
        const allCategories = await this.categoryModel.find();
        if (!allCategories || allCategories.length == 0)
        {
            throw new NotFoundException("Cannot find any data about category !");
        }

        return allCategories;
    }
}
