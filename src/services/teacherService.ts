import * as teacherRepository from '../repositories/teacherRepository';

export async function findTeacheryByName(teacher:string){
    return await teacherRepository.findTeacheryByName(teacher);
}