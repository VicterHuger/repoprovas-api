import pkg from '@prisma/client';

import { dbInitialFactory } from './factories/dbInitialDataFactory';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main(){
  return await dbInitialFactory();
}

main().catch(err=>{
    console.log(err);
    process.exit(1);
}).finally(()=>{
    prisma.$disconnect()
});
