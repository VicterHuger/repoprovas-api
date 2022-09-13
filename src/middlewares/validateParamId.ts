import { Request, Response, NextFunction } from "express";
import { stripHtml } from "string-strip-html";

export function validateParamId(req:Request, res:Response, next:NextFunction){
    const anyId:string= req.params.id;
    const id = Number(stripHtml(anyId).result.trim()) ?? null;
    if(!id) return res.status(422).send("Invalid id");
    res.locals.id = id;
    next();
}