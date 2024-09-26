import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;

    name: string;
    address: string;
    phone: string;
    age: number
}
