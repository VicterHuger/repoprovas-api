import { Request, Response, NextFunction } from 'express';
import { stripHtml } from 'string-strip-html';
import { generateThrowErrorMessage } from '../utils/errorUtils';
import jwt from 'jsonwebtoken'
import * as authService from '../services/authService';

export interface ICustomPayload extends jwt.JwtPayload{
    userId: number
}

export async function tokenValidation(req:Request, res:Response, next:NextFunction){
    const {authorization} : {authorization?:string} = req.headers;
    
    if(!authorization) return res.status(401).send("Headers authorization is missing!");

    const sanitizedHeaders:string = stripHtml(authorization).result.trim();

    const token:string|void = sanitizedHeaders?.replace("Bearer ", "") ?? generateThrowErrorMessage("Unauthorized", "Invalid token");

    if(!token || token===sanitizedHeaders) return res.status(401).send('Invalid token');

    try{
        const { userId } = jwt.verify(<string>token, process.env.TOKEN_SECRET_KEY) as {userId:number};

        if(isNaN(Number(userId))) return res.status(401).send('Invalid token');

        await authService.findUserById(userId);

        res.locals.userId = userId;

        next();

    }catch(err){
        console.log(err);
        return res.status(401).send('Invalid token');
    }


    // jwt.verify(<string>token, process.env.TOKEN_SECRET_KEY, async (err:jwt.VerifyErrors, decoded:ICustomPayload)=>{
        
    //     if(err) {
    //         console.log(err);
    //         return res.status(401).send('Invalid token');
    //     }
        
    //     if(isNaN(Number(decoded.userId))) return res.status(401).send('Invalid token');

    //     await authService.findUserById((decoded.userId) );

    //     res.locals.userId = (decoded.userId);

    //     next();
    // });
    
}