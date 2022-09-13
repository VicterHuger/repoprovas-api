import { Request, Response } from "express";

import * as authService from '../services/authService';
import { TypeUserInsert, TypeUserSingUp } from "../types/userTypes";

export async function createUser(req:Request, res:Response) {
    const {email, password}:TypeUserSingUp = res.locals.body;
    await authService.createUser(email, password);
    return res.sendStatus(201);
}

export async function singInUser(req:Request, res:Response){
    const {email, password}:TypeUserInsert= res.locals.body;
    const token:string = await authService.singInUser(email, password);
    return res.status(200).send({token});
}