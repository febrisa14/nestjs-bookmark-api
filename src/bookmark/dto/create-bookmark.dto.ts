import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookmarkDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    link: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}
