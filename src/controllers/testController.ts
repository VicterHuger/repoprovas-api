import { Request, Response } from "express";
import * as testService from '../services/testService';
import { TypeTestSchema } from "../types/testType";

export async function createTest(_req:Request, res:Response){
    const body:TypeTestSchema = res.locals.body;
    const test = await testService.createTest(body)
    return res.status(201).send(test);
}