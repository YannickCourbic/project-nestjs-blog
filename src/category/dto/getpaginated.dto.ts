import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetPaginatedCategoryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  item: number;
}