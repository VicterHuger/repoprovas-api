import { Request, Response } from "express";
import * as testService from '../services/testService';
import { TypeTestSchema } from "../types/testType";

export async function createTest(req:Request, res:Response){
    const body:TypeTestSchema = res.locals.body;
    await testService.createTest(body)
    return res.sendStatus(201);
}