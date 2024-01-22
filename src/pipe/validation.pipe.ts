import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
 class ParseBodyTransform implements PipeTransform<any ,any> {

    transform(value:any, metadata: ArgumentMetadata):any {
    
        console.log(value);
        
        
        
        
    }
}

export {ParseBodyTransform}