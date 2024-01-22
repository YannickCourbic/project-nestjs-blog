import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsOptionalNumber,  IsOptionnalString } from "src/decorator/validate.dto.decorator";



export class AddCategoryDto {
  @IsString({
    message: "le titre de la catégorie ne peut être qu'une chaîne de caractére",
  })
  @IsNotEmpty({
    message: 'Le titre de la catégorie ne peut être vide.',
  })
  @MinLength(3, {
    message: 'Le titre de la catégorie doit au moins avoir 3 caractères',
  })
  @MaxLength(100, {
    message:  "Le titre de la catégorie peut avoir jusqu'à 100 caractères maximum.",
  })
  title: string;
  @Optional()
  @IsOptionnalString()
  description: string | null;
  @Optional()
  @IsOptionnalString()
  logo: string | null;
  @Optional()
  @IsOptionalNumber()
  parent: number | null;
}