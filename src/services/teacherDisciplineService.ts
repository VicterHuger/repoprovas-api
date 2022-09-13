import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository';

export async function findTeacherDisciplineByIds(disciplineId:number, teacherId:number) {
    return await teacherDisciplineRepository.findTeacherDisciplineByIds(disciplineId, teacherId);
}