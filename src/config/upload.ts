import { Request } from "express";
import {diskStorage} from "multer";

export const upload = (path:string) => {
    
    diskStorage({
        destination: (req:Request, file:any , cb:any) => {
            cb(null , path);
        },
        filename: (req:Request, file:any , cb:any) => {
            const uniqueSuffix = Date.now()+ "-" + Math.round(Math.random() * 1e9)
            cb(null, file.filename + "-" + uniqueSuffix);
        }
    })
}