import * as disciplineRepository from '../repositories/disciplineRepository';

export async function findDisciplineyByName(discipline:string){
    return await disciplineRepository.findDisciplineyByName(discipline);
}