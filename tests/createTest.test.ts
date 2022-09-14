import supertest from "supertest";
import app from "../src/app";
import prisma from '../src/config/databse';

beforeAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
});

describe(' Test route to create tests',()=>{
    
})