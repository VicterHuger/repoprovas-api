import prisma from "../config/databse";

export async function findCategoryByName(name:string){
    return await prisma.category.findUnique({where:{name}})
}