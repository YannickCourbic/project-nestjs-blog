import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class GetPaginatedProductDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  item?: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  name?:string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id?:number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  status?:string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  all?:boolean;


  @IsString()
  @IsOptional()
  @Type(() => String)
  search?:string;
}
