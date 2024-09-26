import { IsNotEmpty } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty({ message: 'name khong de trong' })
    name: string;

    @IsNotEmpty({ message: 'address khong de trong' })
    address: string;

    @IsNotEmpty({ message: 'description khong de trong' })
    description: string;
}
