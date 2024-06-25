import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Max } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,1000)
    @ApiProperty({
        example: 'NBA 중계 협상권',
        description: 'title',
        required: true,
    })
    readonly title: string;
}
