import prisma from "../config/databse";

export async function findTeacheryByName(name:string){
    return await prisma.teacher.findUnique({where:{name}})
}