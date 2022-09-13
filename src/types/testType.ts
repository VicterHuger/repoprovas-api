import { Test } from "@prisma/client"

export type TypeTestSchema = {
    name: string,
    pdfUrl: string,
    category: string,
    teacher: string,
    discipline: string
}

export type TypeTestInsert = Omit<Test,"id">;