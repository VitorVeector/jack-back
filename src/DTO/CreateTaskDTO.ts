import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsInt()
    userId?: number;
}
