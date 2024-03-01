import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { User } from "./user.schema"


export type CarDocument = Car & Document

@Schema()
export class Car{
    @Prop()
    id: string

    @Prop({ required: true })
    model: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
}

export const CarSchema = SchemaFactory.createForClass(Car)