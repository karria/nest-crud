import { IsNotEmpty, IsString, Length, Max } from "class-validator";

export class CreateMemoDto {
  @IsString()
  @IsNotEmpty()
  projectUuid: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  content: string;
}
