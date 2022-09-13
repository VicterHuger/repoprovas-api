import prisma from "../config/databse";

export async function findDisciplineyByName(name:string){
    return await prisma.discipline.findUnique({where:{name}})
}