import { IsNotEmpty, IsString, Max } from "class-validator";

export class CreateMemoDto {
  @IsString()
  @IsNotEmpty()
  readonly projectUuid: string;

  @IsString()
  @IsNotEmpty()
  @Max(1000)
  readonly content: string;
}
