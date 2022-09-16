import { faker } from '@faker-js/faker';
import { TypeTestInsert } from '../../src/types/testType';

export function testFactory(
        category:string=faker.random.alphaNumeric(5),
        discipline:string=faker.random.alpha(10),
        teacher:string=faker.name.fullName()
    ){
    return {
        name: faker.random.alpha(),
        pdfUrl:`${faker.internet.avatar()}.pdf`,
        category,
        discipline, 
        teacher
    }
}

export function testObjectCreationFactory (name:string, pdfUrl:string, categoryId:number, teacherDisciplineId:number):TypeTestInsert{
    return {
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId
    }
}