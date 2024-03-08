import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/dtos/update-category.dto';
import { Category, CategoryDocument } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel : Model<CategoryDocument>) {}

    async createCategory(createCategoryDto: CreateCategoryDto) : Promise<Category>
    {   
        try
        {
            const existedCategoryWithTitle = await this.categoryModel.findOne({ title : createCategoryDto.title });

            if (existedCategoryWithTitle)
            {
                throw new Error(`Category with title : ${createCategoryDto.title} existed !`);
            }
            const newCategory = new this.categoryModel(createCategoryDto);
            if (!newCategory)
            {
                throw new BadRequestException("Cannot create a new category ,please check again !");
            }
            return await newCategory.save();
        }

        catch (err)
        {
            throw new BadRequestException(err.message);
        }
        
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

    async getCategoryById(categoryId: string) : Promise<Category>
    {
        try
        {
            const existedCategory = await this.categoryModel.findById(categoryId);
            if (!existedCategory)
            {
                throw new NotFoundException(`Cannot find category, please check required category again !`);
            }
            return existedCategory;
        }
        
        catch (err)
        {
            throw new BadRequestException(`Bad Request or cannot find the category, please check again`);
        }
    }

    async getCategoryByTitle(title: string) : Promise<Category>
    {
        const existedCategory = await this.categoryModel.findOne({ title });
        if (!existedCategory)
        {
            throw new NotFoundException(`Cannot find category with title : ${title}`);
        }
        return existedCategory;
    }

    async updateCategoryByTitle(title: string, updateCategoryDto: UpdateCategoryDto) : Promise<Category>
    {
        try
        {
            const updateCategory = await this.categoryModel.findOneAndUpdate({ title }, updateCategoryDto, { new : true });
            if (!updateCategory)
            {
                throw new NotFoundException(`Cannot find category with title ${title} to update`);
            }
            return updateCategory;
        }

        catch (err)
        {
            throw new BadRequestException('Bad Request or cannot find the category, please check again');
        }
    }

    async updateCategoryById(categoryId: string, updateCategoryDto: UpdateCategoryDto) : Promise<Category>
    {
        try
        {
            const updateCategory = await this.categoryModel.findByIdAndUpdate(categoryId, updateCategoryDto, { new : true });
            if (!updateCategory)
            {
                throw new NotFoundException(`Cannot find category, please check required category again !`);
            }
            return updateCategory;
        }

        catch (err)
        {
            throw new BadRequestException('Bad Request or cannot find the category, please check again');
        }
    }

    async deleteCategoryById(categoryId: string) : Promise<Category>
    {
        try
        {
            const deletedCategory = await this.categoryModel.findByIdAndDelete(categoryId);
            if (!deletedCategory)
            {
                throw new NotFoundException(`Cannot find category, please check required category again !`);
            }
            return deletedCategory;
        }

        catch (err)
        {
            throw new BadRequestException('Bad Request or cannot found the find the category, please check again');
        }
    }

    async deleteCategoryByTitle(title: string) : Promise<Category>
    {
        try
        {
            const deletedCategoryByTitle = await this.categoryModel.findOneAndDelete({ title });
            if (!deletedCategoryByTitle)
            {
                throw new NotFoundException(`Cannot find category with title ${title} , please check again`);
            }
            return deletedCategoryByTitle;
        }

        catch (err)
        {
            throw new BadRequestException('Bad Request or cannot found the find the category, please check again');
        }
        
    }
}
