import { Optional } from "@nestjs/common";
import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";
import {IsOptionalNumber } from "src/decorator/validate.dto.decorator";



export class AddProductDto {
  @IsString({
    message: "le titre du produit ne peut être qu'une chaîne de caractére",
  })
  @IsNotEmpty({
    message: 'Le titre du produit ne peut être vide.',
  })
  @MinLength(3, {
    message: 'Le titre du produit doit au moins avoir 3 caractères',
  })
  @MaxLength(150, {
    message:"Le titre du produit peut avoir jusqu'à 100 caractères maximum.",
  })
  title: string; 
  @IsString({message: "Le status du produit ne peut être qu'une chaîne de caractère."})
  @IsNotEmpty({message: "Le status du produit ne peut être vide , null ou undefined."})
  @IsEnum({draft: "draft" , public: "public" , trash:"trash"} , {message: "Le status est non supportée."})
  status: string;
  @IsInt()
  @Min(0)
  stock: number;
  @Min(0)
  price: number;
  @Optional()
  @IsOptionalNumber()
  category: number | null;
  @Optional()
  media: number[] | null;
}