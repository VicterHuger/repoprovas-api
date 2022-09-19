import * as categoryService from '../services/categoryService';
import * as disciplineService from '../services/disciplineService';
import * as teacherService from '../services/teacherService';
import * as teacherDisciplineService from '../services/teacherDisciplineService';
import * as testRepository from '../repositories/testRepository';
import { Category, Discipline, Teacher, TeacherDiscipline, Test } from "@prisma/client";
import { TypeTestSchema, TypeTestOfListDiscipline } from "../types/testType";
import { generateThrowErrorMessage } from '../utils/errorUtils';
import { testObjectCreationFactory } from '../../prisma/factories/testFactory';

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
    const rawTests = await testRepository.findTestsPerDiscipline();    

    // for(const term of rawTests){
    //     for(const discipline of term.disciplines){
    //         for(const teacherDiscipline of discipline.teacherDisciplines){
    //             if(teacherDiscipline.tests.length ===0) break;
    //             const teacher = teacherDiscipline.teacher;
    //             delete teacherDiscipline.teacher;
    //             const hashtableCategory:{id?:number, name?:string, pdfUrl?:string, category?:object, teacher?:object}= {};
    //             for(const test of teacherDiscipline.tests){
    //                 const newTest:TypeTestOfListDiscipline = {...test}
    //                 newTest.teacher = teacher;
    //                 if(hashtableCategory[newTest.category.name]===undefined) {
    //                     hashtableCategory[newTest.category.name] = new Array(newTest);
    //                     continue;
    //                 }
    //                 hashtableCategory[test.category.name].push(newTest);
    //             }
    //             console.log(hashtableCategory)
    //             delete teacherDiscipline.tests;
    //             for(let i=0; i<Object.values(hashtableCategory).length; i++){
    //                 delete teacherDiscipline.tests;
    //                 teacherDiscipline.tests.push(Object.values(hashtableCategory)[i])
    //             }

    //         }
    //     }
    // }

    return {terms:rawTests};
}

export async function listTestsPerTeacher(){
    const tests = await testRepository.findTestsPerTeacher();
    return {teachers:tests};
}
