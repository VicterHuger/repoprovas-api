import prisma from "../../src/config/databse";

export async function dbInitialFactory(){
    const sqlQueries = [
    `INSERT INTO terms ("number") VALUES (1) ON CONFLICT DO NOTHING;`,
    `INSERT INTO terms ("number") VALUES (2) ON CONFLICT DO NOTHING;`,
    `INSERT INTO terms ("number") VALUES (3) ON CONFLICT DO NOTHING;`,
    `INSERT INTO terms ("number") VALUES (4) ON CONFLICT DO NOTHING;`,
    `INSERT INTO terms ("number") VALUES (5) ON CONFLICT DO NOTHING;`,
    `INSERT INTO terms ("number") VALUES (6) ON CONFLICT DO NOTHING;`,
    
    
    `INSERT INTO categories ("name") VALUES ('Projeto') ON CONFLICT DO NOTHING;`,
    `INSERT INTO categories ("name") VALUES ('Prática') ON CONFLICT DO NOTHING;`,
    `INSERT INTO categories ("name") VALUES ('Recuperação') ON CONFLICT DO NOTHING;`,
    
    
    `INSERT INTO teachers ("name") VALUES ('Diego Pinho') ON CONFLICT DO NOTHING;`,
    `INSERT INTO teachers ("name") VALUES ('Bruna Hamori') ON CONFLICT DO NOTHING;`,
    
    
    `INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1) ON CONFLICT DO NOTHING;`,
    `INSERT INTO disciplines ("name", "termId") VALUES ('JavaScript', 2) ON CONFLICT DO NOTHING;`,
    `INSERT INTO disciplines ("name", "termId") VALUES ('React', 3) ON CONFLICT DO NOTHING;`,
    `INSERT INTO disciplines ("name", "termId") VALUES ('Humildade', 1) ON CONFLICT DO NOTHING;`,
    `INSERT INTO disciplines ("name", "termId") VALUES ('Planejamento', 2) ON CONFLICT DO NOTHING;`,
    `INSERT INTO disciplines ("name", "termId") VALUES ('Autoconfiança', 3) ON CONFLICT DO NOTHING;`,
    
   
    `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1) ON CONFLICT DO NOTHING;`,
    `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2) ON CONFLICT DO NOTHING;`,
    `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3) ON CONFLICT DO NOTHING;`, 
    `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4) ON CONFLICT DO NOTHING;`,
    `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5) ON CONFLICT DO NOTHING;`,
    `INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6) ON CONFLICT DO NOTHING;`];

    sqlQueries.forEach(async(sql)=>{
        await prisma.$executeRawUnsafe(sql);
    });
    return ;
}