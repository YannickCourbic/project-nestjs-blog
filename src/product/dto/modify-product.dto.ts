import { IsOptional } from "class-validator";
import {  IsOptionalEnum, IsOptionalNumber, IsOptionnalString } from "src/decorator/validate.dto.decorator";

export class ModifyProductDto {
    
    @IsOptional()
    @IsOptionnalString()
    title:string;
    @IsOptional()
    @IsOptionalNumber()
    stock:number;
    @IsOptional()
    @IsOptionalNumber()
    price:number;
    @IsOptional()
    @IsOptionnalString()
    @IsOptionalEnum(null, ["draft" , "public" , "trash"])
    status:string;
    @IsOptional()
    @IsOptionalNumber()
    category:number;

}