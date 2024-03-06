import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/schemas/category.schema';
import { PostSchema } from 'src/schemas/post.schema';
import { PostService } from './services/post.service';
import { CategoryService } from './services/category.service';
import { PostController } from './controller/post.controller';
import { CategoryController } from './controller/category.controller';

@Module({
    imports : [
        MongooseModule.forFeature([
            {
                name : 'Post',
                schema : PostSchema
            },
            {
                name : 'Category',
                schema : CategorySchema
            }
        ])
    ],
    providers: [PostService, CategoryService],
    controllers: [PostController, CategoryController]
})
export class PostModule {}
