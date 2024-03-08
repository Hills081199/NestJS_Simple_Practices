import { IsNotEmpty, MaxLength } from "class-validator";

export class UpdateCategoryDto
{
    @IsNotEmpty()
    @MaxLength(20)
    title: string
}