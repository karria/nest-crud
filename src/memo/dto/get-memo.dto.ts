import { Pagination } from "@src/common/pagination";
import { IsNotEmpty, IsString } from "class-validator";

export class GetMemoDto extends Pagination {
  @IsString()
  @IsNotEmpty()
  projectUuid: string;
}