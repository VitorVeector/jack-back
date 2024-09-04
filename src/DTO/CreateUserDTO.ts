import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
