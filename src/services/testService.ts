import * as categoryService from '../services/categoryService';
import * as disciplineService from '../services/disciplineService';
import * as teacherService from '../services/teacherService';
import * as teacherDisciplineService from '../services/teacherDisciplineService';
import * as testRepository from '../repositories/testRepository';
import { Category, Discipline, Teacher, TeacherDiscipline, Test } from "@prisma/client";
import { TypeTestSchema } from "../types/testType";
import { generateThrowErrorMessage } from '../utils/errorUtils';
import { testObjectCreationFactory } from '../../prisma/factories/testFactory';
import { testFactory } from '../../prisma/factories/testFactory';

export async function createTest(body:TypeTestSchema){
   const { name, pdfUrl, category, discipline, teacher }:TypeTestSchema = body;
   const categoryDb:Category = await categoryService.findCategoryByName(category);
   if(!categoryDb) generateThrowErrorMessage("NotFound", "There is no category with the category name passed!");
   const disciplineDb:Discipline = await disciplineService.findDisciplineyByName(discipline);
   if(!disciplineDb) generateThrowErrorMessage("NotFound", "There is no discipline with the discipline name passed!");
   const teacherDb:Teacher = await teacherService.findTeacheryByName(teacher);
   if(!teacherDb) generateThrowErrorMessage("NotFound", "There is no teacher with this name");
   const teacherDisciplineDb: TeacherDiscipline = await teacherDisciplineService.findTeacherDisciplineByIds(disciplineDb.id, teacherDb.id);
   if(!teacherDisciplineDb) generateThrowErrorMessage("NotFound", "This teacher hasn't teached on this discipline");
   const testInsertObject = testObjectCreationFactory(name, pdfUrl,categoryDb.id,teacherDisciplineDb.id );
   const existingTest = await testRepository.findTest(testInsertObject);
   if(existingTest) generateThrowErrorMessage("Conflict","This test was already created");
   const test:Test = await testRepository.createTest(testInsertObject);
   if(!test) generateThrowErrorMessage("InternalServerError", "Something went wrong and the test could not be created!");
   return test;
}

export async function listTestsPerDiscipline(){
    const tests = await testRepository.findTestsPerDiscipline();
    return {terms:tests};
}

export async function listTestsPerTeacher(){
    const tests = await testRepository.findTestsPerTeacher();
    return {teachers:tests};
}
