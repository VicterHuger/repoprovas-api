import { faker } from '@faker-js/faker';

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