import { Request, Response, NextFunction } from 'express';
import { stripHtml } from 'string-strip-html';
import { generateThrowErrorMessage } from '../utils/errorUtils';
import jwt from 'jsonwebtoken'
import * as authService from '../services/authService';

interface ICustomPayload extends jwt.JwtPayload{
    userId: string
}

export function tokenValidation(req:Request, res:Response, next:NextFunction){
    const {authorization} : {authorization?:string} = req.headers;
    if(!authorization) return res.status(400).send("Headers authorization is missing!");

    const sanitizedHeaders:string = stripHtml(authorization).result.trim();

    const token:string|void = sanitizedHeaders?.replace("Bearer ", "") ?? generateThrowErrorMessage("Unauthorized", "Invalid token");

    if(!token || token===sanitizedHeaders) generateThrowErrorMessage("Unauthorized", "Invalid token");

    jwt.verify(<string>token, process.env.TOKEN_SECRET_KEY, async (err:jwt.VerifyErrors, decoded:ICustomPayload)=>{
        
        if(err) {
            console.log(err);
            return res.status(401).send('Invalid token');
        }
        
        if(isNaN(Number(decoded.userId))) return res.status(401).send('Invalid token');

        await authService.findUserById(Number(decoded.userId) );

        res.locals.userId = Number(decoded.userId);

        next();
    })
    
}