import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly uuid: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}