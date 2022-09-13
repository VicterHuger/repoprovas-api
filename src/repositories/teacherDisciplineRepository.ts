import prisma from "../config/databse";

export async function findTeacherDisciplineByIds(disciplineId:number, teacherId:number){
    return await prisma.teacherDiscipline.findFirst({where:{disciplineId, teacherId}});
}