import { Request, Response, NextFunction } from "express";
import joi from 'joi';
import {stripHtml} from 'string-strip-html';

interface ICustomRequestBody <T> extends Request {
    body: T
}


export function validateSchema<T>(schema:joi.ObjectSchema<T>){
    return (req:ICustomRequestBody<T>, res:Response, next:NextFunction)=>{
        const body= req.body;

        for (const key of Object.keys(body)){
            if(typeof(body[key]) === "string" ){
                body[key] = stripHtml(body[key])?.result.trim() ?? body[key];
            }
        }

        const {error}:{error:joi.ValidationError} = schema.validate(body, {abortEarly:false});
        if(error){
            const errorText:string = error.details.reduce((prev:string, curr:joi.ValidationErrorItem)=>{
                return `${prev} \n ${curr.message}`;
            },"");

            return res.status(422).send(errorText);
        }
        
        res.locals.body = body;
        
        return next();
    }
}