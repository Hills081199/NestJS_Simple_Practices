import { IsNotEmpty } from "class-validator"

export class CreateUserDto{
    id: string

    @IsNotEmpty()
    name: string
}