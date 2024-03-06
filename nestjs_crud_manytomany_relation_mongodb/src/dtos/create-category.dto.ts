import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCategoryDto
{
    @IsNotEmpty()
    @MaxLength(20)
    title : string
}