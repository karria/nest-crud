import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    private readonly title: string;
}
