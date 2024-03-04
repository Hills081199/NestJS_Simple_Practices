import { IsNotEmpty } from "class-validator";
import { CreateCarDto } from "./create-car.dto";

export class UpdateCarDto {

    @IsNotEmpty()
    model: string
}