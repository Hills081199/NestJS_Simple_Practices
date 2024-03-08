import { Body, Controller, HttpStatus, Post, Get, Delete, Res, Param, Query, Put } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from 'src/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/dtos/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Post()
    async createNewCategory(@Res() response, @Body() createNewCategoryDto: CreateCategoryDto)
    {
        try
        {
            const newCategory = await this.categoryService.createCategory(createNewCategoryDto);
            return response.status(HttpStatus.CREATED).json({
                message : "A new category is created !",
                newCategory,
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getAllCategory(@Res() response)
    {
        try
        {
            const allCategories = await this.categoryService.getAllCategories();
            return response.status(HttpStatus.OK).json({
                message: "All Categories found ! ",
                allCategories,
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('id/:category_id')
    async getCategoryById(@Res() response, @Param('category_id') category_id)
    {
        try
        {
            const existedCategory = await this.categoryService.getCategoryById(category_id);
            return response.status(HttpStatus.OK).json({
                message: "Category found !",
                existedCategory
            })
        }

        catch (err)
        {
            return response.status(err.status). json(err.response);
        }
    }

    @Get('title')
    async getCategoryByTitle(@Res() response, @Query('title') title: string)
    {
        try
        {
            const existedCategory = await this.categoryService.getCategoryByTitle(title);
            return response.status(HttpStatus.OK).json({
                message : `Category with titlte : ${title}`,
                existedCategory
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Put('id/:category_id')
    async updateCateoryById(@Res() response, @Param('category_id') category_id, @Body() updateCategoryDt: UpdateCategoryDto)
    {
        try
        {
            const updateCategory = await this.categoryService.updateCategoryById(category_id, updateCategoryDt);
            return response.status(HttpStatus.OK).json({
                message : `Category updated !`,
                updateCategory
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Put('title')
    async updateCategoryByTitle(@Res() response, @Query('title') title: string, @Body() updateCategoryDto: UpdateCategoryDto)
    {
        try
        {
            const updateCategory = await this.categoryService.updateCategoryByTitle(title, updateCategoryDto)
            return response.status(HttpStatus.OK).json({
                message : `Category with title ${title} updated !`,
                updateCategory
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('id/:category_id')
    async deleteCategoryById(@Res() response, @Param('category_id') category_id)
    {
        try
        {
            const deletedCategory = await this.categoryService.deleteCategoryById(category_id);
            return response.status(HttpStatus.OK).json({
                message : `Category deleted !`,
                deletedCategory
            });
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('title')
    async deleteCategoryByTitle(@Res() response, @Query('title') title: string)
    {
        try
        {
            const deletedCategoryByTitle = await this.categoryService.deleteCategoryByTitle(title);
            return response.status(HttpStatus.OK).json({
                message : `Category with title ${title} deleted !`,
                deletedCategoryByTitle,
            })
        }

        catch (err)
        {
            return response.status(err.status).json(err.response);
        }
    }
}
