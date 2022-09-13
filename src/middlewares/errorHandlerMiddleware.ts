import { Request, Response, NextFunction } from "express";
import { IErrorMessage, IErrorExtended} from "../types/errorType";

export function errorHandlerMiddleware(err:IErrorMessage|IErrorExtended, _req:Request, res:Response, _next:NextFunction){
    const errorStatus = {
        "BadRequest": 400,
        "Unauthorized":401,
        "NotFound":404,
        "Conflict":409,
        "UnprocessableEntity":422,
        "InternalServerError":500
    }
    console.log(err);
    return res.status(errorStatus[err.code]||500).send(err.message);

}