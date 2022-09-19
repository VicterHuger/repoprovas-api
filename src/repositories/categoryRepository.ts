import prisma from "../config/databse";

export async function findCategoryByName(name:string){
    return await prisma.category.findUnique({where:{name}})
}

export async function findAllCategoriesNames(){
    return await prisma.category.findMany({
        select:{
            name:true
        }
    })
}