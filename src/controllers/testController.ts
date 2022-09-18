import { Request, Response } from "express";
import * as testService from '../services/testService';
import { TypeTestSchema } from "../types/testType";

export async function createTest(_req:Request, res:Response){
    const body:TypeTestSchema = res.locals.body;
    const test = await testService.createTest(body)
    return res.status(201).send(test);
}

export async function listTestsPerDiscipline(_req:Request, res:Response){
    const tests = await testService.listTestsPerDiscipline();
    return res.status(200).send(tests);
}

export async function listTestsPerTeacher(_req:Request, res:Response){
    const tests = await testService.listTestsPerTeacher();
    return res.status(200).send(tests);
}