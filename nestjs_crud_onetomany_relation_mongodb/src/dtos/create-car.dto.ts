import { IsNotEmpty } from "class-validator"

export class CreateCarDto{
    id: string

    @IsNotEmpty()
    model: string

    @IsNotEmpty()
    user: string
}