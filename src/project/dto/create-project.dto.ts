import { IsNotEmpty, IsString, Max } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @Max(1000)
    readonly title: string;
}
