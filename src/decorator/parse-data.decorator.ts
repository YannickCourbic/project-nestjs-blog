import { ExecutionContext, createParamDecorator } from "@nestjs/common";


 const ParseBodyData = createParamDecorator(
(data:any , context:ExecutionContext) => {
        const req = context.switchToHttp().getRequest();

        if(req.body.data){
            try {
                return JSON.parse(req.body.data);
            } catch (error) {
                throw new Error("Invalide JSON format in request body");
            }
        }
    }
)

const ParseBodyProductImage = createParamDecorator(
    (data:any , context:ExecutionContext) => {
        const req = context.switchToHttp().getRequest();

        if(req.body.images){
            try {
                return JSON.parse(req.body.images);
            } catch (error) {
                throw new Error("Invalide JSON format in request body");
            }
        }
    }
);

const ParseBodyArrayProductImage = createParamDecorator(
    (data:any , context:ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        if(req.body.images){
            try {
                return JSON.parse(req.body.images);
            } catch (error) {
                throw new Error('Invalide JSON format in request body');
            }
        }
    }
)





export {ParseBodyData, ParseBodyProductImage, ParseBodyArrayProductImage }