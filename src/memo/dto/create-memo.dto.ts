import { IsNotEmpty, IsString, Max } from "class-validator";

export class CreateMemoDto {
  @IsString()
  @IsNotEmpty()
  projectUuid: string;

  @IsString()
  @IsNotEmpty()
  @Max(1000)
  content: string;
}
