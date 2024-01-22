import { ValidationOptions, registerDecorator } from "class-validator";
// import { CategoryService } from "src/category/category.service";
import { IsOptionalCategoryExistValidation, IsOptionalEnumValidation, IsOptionalParentExistValidation, IsOptionalProductExistValidation, IsOptionalStringValidation, IsOptionnalNumberValidation } from "src/validator/dto.validator";



const IsOptionnalString = (validationOptions?:ValidationOptions) => {
    
    return (object: any , propertyName:string) => {
        registerDecorator({
            name: 'isOptionalString',
            target:object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsOptionalStringValidation
        })
    } 
}


const IsOptionalNumber = (validationOptions?:ValidationOptions) => {
    return (object:any , propertyName:string) => {
        registerDecorator({
            name: "isOptionalNumber",
            target: object.constructor,
            propertyName: propertyName,
            options:validationOptions,
            validator: IsOptionnalNumberValidation
        })
    }
}


const IsOptionalParentExist = (validationOptions?:ValidationOptions) => {
    return (object: any , propertyName:string) => {
        registerDecorator({
            name: 'isOptionalParentExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsOptionalParentExistValidation,
        });
    }
}

const IsOptionalEnum = (validationOptions?:ValidationOptions, enumValues?:string[]) => {
    return (object:any, propertyName:string) => {
        registerDecorator({
            name:"isOptionalEnum",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: new IsOptionalEnumValidation(enumValues)
        })
    }
}
const IsOptionalCategoryExist = (validationOptions?: ValidationOptions) => {
    return (object:any, propertyName:string) => {
        registerDecorator({
            name:"isOptionalCategoryExist",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsOptionalCategoryExistValidation
        })
    }
};

const IsOptionalProductExist = (validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'isOptionalProductExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsOptionalProductExistValidation,
        });
    };
}

export {IsOptionnalString , IsOptionalNumber, IsOptionalParentExist, IsOptionalEnum, IsOptionalCategoryExist, IsOptionalProductExist}