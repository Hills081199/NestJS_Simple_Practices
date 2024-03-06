import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { Post } from "./post.schema";
import { Transform } from "class-transformer";

export type CategoryDocument = Category & Document

@Schema()
export class Category
{
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}])
    posts: Post;
}

export const CategorySchema = SchemaFactory.createForClass(Category);