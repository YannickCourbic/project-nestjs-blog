import { Optional } from "@nestjs/common";
import { IsOptionalEnum, IsOptionalNumber, IsOptionnalString } from "src/decorator/validate.dto.decorator";

export class ModifyProductImageDto {

  @Optional()
  @IsOptionnalString()
  @IsOptionalEnum(null ,
["grey" , "white" , "red" , "pink" , "blue", "violet", "yellow" , "marron"])
  color: string | null;
  @Optional()
  @IsOptionalNumber()
  product:number|null;

}  