import pkg from '@prisma/client';

import { dbInitialFactory } from './factories/dbInitialDataFactory';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main(){
    const queriesSql:string[] = dbInitialFactory();
    queriesSql.forEach(async(sql)=>{
        await prisma.$executeRawUnsafe(sql);
    });
}

main().catch(err=>{
    console.log(err);
    process.exit(1);
}).finally(()=>{
    prisma.$disconnect()
});
