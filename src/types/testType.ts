import { Test } from "@prisma/client"
import { IHashTableCategory } from './categoryType';

export type TypeTestSchema = {
    name: string,
    pdfUrl: string,
    category: string,
    teacher: string,
    discipline: string
}

export type TypeTestInsert = Omit<Test,"id">;

export type TypeTestOfListDiscipline = {
        id: number;
        name: string;
        pdfUrl: string;
        category?: {
            name: string;
            id: number;
        };
        teacher?:{
            id:number;
            name: string;
        }
        
}

export type TypeTestsPerTerms={
    number: number;
    id: number;
    disciplines: {
        name: string;
        id: number;
        teacherDisciplines: {
            teacher?: {
                name: string;
                id: number;
            };
            id: number;
            tests?: {
                name: string;
                pdfUrl: string;
                category: {
                    name: string;
                    id: number;
                };
                id: number;
                teacher?: {
                    name: string;
                    id: number;
                };
            }[];
            categories?:IHashTableCategory<TypeTestOfListDiscipline>
        
        }[];
    }[];
}


// export type TypeTestsPerTeachers={
//     number: number;
//     id: number;
//     disciplines: {
//         name: string;
//         id: number;
//         teacherDisciplines: {
//             teacher?: {
//                 name: string;
//                 id: number;
//             };
//             id: number;
//             tests?: {
//                 name: string;
//                 pdfUrl: string;
//                 category: {
//                     name: string;
//                     id: number;
//                 };
//                 id: number;
//                 teacher?: {
//                     name: string;
//                     id: number;
//                 };
//             }[];
//             categories?:IHashTableCategory<TypeTestOfListDiscipline>
        
//         }[];
//     }[];
// }
