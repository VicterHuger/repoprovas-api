import prisma from "../config/databse";
import { TypeTestInsert } from "../types/testType";

export async function createTest(test:TypeTestInsert){
    return await prisma.test.create({data:test});
}

export async function findTest(test:TypeTestInsert){
    return await prisma.test.findFirst({where:{...test}})
}

export async function findTestsPerDiscipline(){
    return await prisma.term.findMany({
        select:{    
            id:true,
            number:true,
            disciplines:{
                select:{
                    id:true,
                    name:true,
                    teacherDisciplines:{
                        distinct:['id'],
                        select:{
                            id:true,
                            teacher:{
                                select:{
                                    id:true,
                                    name:true,
                                }
                            },
                            tests:{
                                select:{
                                    id:true,
                                    name:true,
                                    pdfUrl:true,
                                    category:{
                                        select:{
                                            id:true,
                                            name:true
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            }
        }
    });
}

export async function findTestsPerTeacher(){
    return await prisma.teacher.findMany({
        select:{
            id:true,
            name:true,
            teacherDisciplines:{
                select:{
                    discipline:{
                        select:{
                            id:true,
                            name:true,
                            teacherDisciplines:{
                                distinct:['disciplineId', 'teacherId'],
                                select:{
                                    id:true,
                                    tests:{
                                        distinct:['teacherDisciplineId'],
                                        select:{
                                            id:true,
                                            name:true,
                                            pdfUrl:true,
                                            teacherDisciplineId:true,
                                            category:{
                                                select:{
                                                    id:true,
                                                    name:true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                },
            }
        }
    });
}

// tests :{
//     distinct:['categoryId'],
//     select:{
//         category:{
//             select :{
//                 id:true,
//                 name:true,
//                 tests:{
//                     select:{
//                         id:true,
//                         name:true,
//                         pdfUrl:true
//                     }
//                 }
            
//             }
//         }
//     },                       
    
// }