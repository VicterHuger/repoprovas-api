import prisma from "../config/databse";
import { TypeTestInsert } from "../types/testType";

export async function createTest(test:TypeTestInsert){
    return await prisma.test.create({data:test});
}

export async function findTest(test:TypeTestInsert){
    return await prisma.test.findFirst({where:{...test}})
}