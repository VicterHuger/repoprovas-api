import prisma from "../config/databse";
import { TypeUserInsert } from "../types/userTypes";

export async function createUser(user:TypeUserInsert){
    const result = await prisma.user.create({data: user });
    return result;
}

export async function findUserByEmail(email:string){
    const result = await prisma.user.findUnique({where: {email}});
    return result; 
}

export async function findUserById(id:number){
    return await prisma.user.findUnique({where:{id}});
}