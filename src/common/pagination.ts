import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export enum PaginationDefault {
  PAGE_DEFAULT = 0,
  SIZE_DEFAULT = 10,
  SKIP_DEFAULT = 0,
}

export class Pagination {
  @Type(() => Number)
  @IsOptional()
  page?: number = PaginationDefault.PAGE_DEFAULT;

  @Type(() => Number)
  @IsOptional()
  size?: number = PaginationDefault.SIZE_DEFAULT;

  getSkip() {
    return this.page * this.size || PaginationDefault.SKIP_DEFAULT;
  }

  getSize() {
    return this.size;
  }
}