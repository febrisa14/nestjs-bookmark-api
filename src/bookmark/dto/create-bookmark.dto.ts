import { Contains, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookmarkDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    link: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
