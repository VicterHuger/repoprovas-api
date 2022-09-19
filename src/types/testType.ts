import { Test } from "@prisma/client"

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
