import { Body, Controller, HttpStatus, Post, Get, Res } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from 'src/dtos/create-category.dto';

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
}
