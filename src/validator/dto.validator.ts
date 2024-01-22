
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { CategoryService } from 'src/category/category.service';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'IsOptionnalString' , async: false })
class IsOptionalStringValidation implements ValidatorConstraintInterface
{
    validate(value: string | null, args: ValidationArguments) {
        console.log(args);
        
        try {
        if (value === null || value === undefined) {
            return true;
        }

        if (typeof value === 'string') {
            return true;
        }

        return false;
        } catch (error) {
        return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        const propertyName = args.property;

        return `Le champ ${propertyName} ne peut être qu'une chaîne de caractères ou null.`;
    }
}


@ValidatorConstraint({name: "IsOptionnalNumber" , async:false})
class IsOptionnalNumberValidation implements ValidatorConstraintInterface{
    validate(value: any) {
        try {
            if(value === null || value === undefined){
                return true;
            }
            if(typeof value === "number" && value > 0){
                return true
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    defaultMessage(args?: ValidationArguments): string {
        return `Le champ ${args.property} ne peut être qu'un nombre ou null`;
    }
}

@ValidatorConstraint({name: "IsOptionalParentExist" , async:false})
@Injectable()
class IsOptionalParentExistValidation implements ValidatorConstraintInterface{
    constructor(private readonly categoryService: CategoryService){}
    
    validate(value: number|null) {
        try {
            if(value === null || value === undefined){
                return true;
            }
            if(value !== null || value !== undefined){
                const parent = this.categoryService.findById(value);
                console.log(parent);
            }
            return false;
        } catch (error) {
            return false;
        }
    }
    defaultMessage(args?: ValidationArguments): string {
        return `Le ${args.property} du produit n'existe pas.`;
    }
}
@ValidatorConstraint({ name: 'IsOptionalEnum', async: false })
@Injectable()
class IsOptionalEnumValidation {
  constructor(public enumValues?: string[]) {
    this.enumValues = enumValues;
  }

  validate(value: string) {
    if (value === null || value === undefined) {
      return true;
    } else {
      return this.enumValues.includes(value);
    }
  }

  defaultMessage(args?: ValidationArguments): string {
    return `Le champ ${args.property} n'est pas supportée.`;
  }
}
@ValidatorConstraint({ name: 'IsOptionalCategoryExist', async: true })
@Injectable()
class IsOptionalCategoryExistValidation {
  constructor(private readonly categoryService: CategoryService) {}
  async validate(value: number) {
    if (value === null || value === undefined) {
      return true;
    } else {
      const category = await this.categoryService.findById(value);
      return !!category; // Utilisation de la double négation pour convertir en booléen
    }
  }

  defaultMessage(args?: ValidationArguments): string {
    return `Le champ ${args.property} n'existe pas, donc l'id est sûrement invalide.`;
  }
}
@ValidatorConstraint({ name: 'IsOptionalCategoryExist', async: true })
@Injectable()
class IsOptionalProductExistValidation {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async validate(value: string) {
    console.log();

    if (value === null || value === undefined) {
      return true;
    } else {
      
      console.log(this.entityManager);
      
      return !!null; // Utilisation de la double négation pour convertir en booléen
    }
  }

  defaultMessage(args?: ValidationArguments): string {
    return `Le champ ${args.property} n'existe pas, donc l'id est sûrement invalide.`;
  }
}



export {IsOptionalStringValidation , IsOptionnalNumberValidation , IsOptionalParentExistValidation, IsOptionalEnumValidation , IsOptionalCategoryExistValidation, IsOptionalProductExistValidation}

