import { Optional } from "@nestjs/common";
import { IsOptionnalString } from "src/decorator/validate.dto.decorator";
// import { IsString, IsNotEmpty, MinLength, MaxLength, IsBoolean } from "class-validator";


export class ModifyCategoryDto {
  @Optional()
  // @IsString({
  //   message: "le titre de la catégorie ne peut être qu'une chaîne de caractére",
  // })
  // @IsNotEmpty({
  //   message: 'Le titre de la catégorie ne peut être vide.',
  // })
  // @MinLength(3, {
  //   message: 'Le titre de la catégorie doit au moins avoir 3 caractères',
  // })
  // @MaxLength(100, {
  //   message:
  //     "Le titre de la catégorie peut avoir jusqu'à 100 caractères maximum.",
  // })
  @IsOptionnalString()
  title: string;
  @Optional()
  description: string | null;
  @Optional()
  // @IsBoolean({
  //   message: "Le champ visibility ne peut être que de type booléen."
  // })
  // @IsNotEmpty({
  //   message: "Le champ ne peut être vide , null ou undefined"
  // })
  visibility: boolean;
  @Optional()
  parent: number | null;
}