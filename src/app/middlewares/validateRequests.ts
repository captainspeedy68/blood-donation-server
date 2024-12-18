import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationMiddleware = (schema: AnyZodObject) => { 
    return async(req: Request, res: Response, next: NextFunction) => {
        // console.log(req.body);
       try{
        // console.log(req.body);
        await schema.parseAsync({
            body: req.body
        });
        next();
       }catch(err){
        next(err)
       }
}
}

export default validationMiddleware;