import { Optional } from "@nestjs/common";
import {  IsOptionnalString } from "src/decorator/validate.dto.decorator";


export class AddProductImageDto {

    @Optional()
    @IsOptionnalString()
    color:string|null;
}