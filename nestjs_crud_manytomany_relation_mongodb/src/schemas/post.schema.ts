import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { Category } from "./category.schema";
import { Transform } from "class-transformer";

export type PostDocument = Post & Document

@Schema()
export class Post
{
    @Transform(({value}) => value.toString())
    _id: ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
    categories: Category;
}

export const PostSchema = SchemaFactory.createForClass(Post);