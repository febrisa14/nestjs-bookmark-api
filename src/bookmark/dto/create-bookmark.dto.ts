import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookmarkDto {
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    link: string;
}
