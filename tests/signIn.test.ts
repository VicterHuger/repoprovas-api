import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/databse";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
})

describe('Test to sing-in an user',()=>{
    it('Test if the route /sign-in will responde with a status 422 if any required body param be not sent',async()=>{
        const result = await supertest(app).post('/sign-in').send({});
        expect(result.status).toBe(422);
    });

    it('Test if the route /sign-in will responde with a status 422 if email required body param be not sent',async()=>{
        const result = await supertest(app).post('/sign-in').send({password:'123'});
        expect(result.status).toBe(422);
    });

    it('Test if the route /sign-in will responde with a status 422 if password required body param be not sent',async()=>{
        const result = await supertest(app).post('/sign-in').send({email:'victor@email.com'});
        expect(result.status).toBe(422);
    });

    it('Test if the route /sign-in will responde with a status 422 if password required body param be not sent', async()=>{
        const result = await supertest(app).post('/sign-in').send({email:'victor@email.com'});
        expect(result.status).toBe(422);
    });

    it('Test if the route /sign-in will responde with status 401 if the email passed was not sign-up and all body params are correct', async()=>{
        const result = await supertest(app).post('/sign-in').send({email:'teste@gmail.com', password:'123456'});
        expect(result.status).toBe(401);
    });

    it('Test if the route /sign-in will responde with status 401 if the password passed is not correct for an email sign-up and all body params are correct', async()=>{
        await supertest(app).post('/sign-up').send({email:'teste@gmail.com', password:'123456', confirmPassword:'123456'});
        const result = await supertest(app).post('/sign-in').send({email:'teste@gmail.com', password:'123457'});
        expect(result.status).toBe(401);
    });
    it('Test if the route /sign-in will responde with status 200 and a token valid for the user sign-up, if the all the required body params are correct and previously sign-up', async()=>{
        
        await supertest(app).post('/sign-up').send({email:'teste@gmail.com', password:'123456', confirmPassword:'123456'});

        const user = await prisma.user.findUnique({where:{email:'teste@gmail.com'}});
        
        const result = await supertest(app).post('/sign-in').send({email:'teste@gmail.com', password:'123456'});

        const {userId}=jwt.verify(<string>result.body.token, process.env.TOKEN_SECRET_KEY) as {userId:number}

        expect(result.status).toBe(200);
        expect(typeof result.body.token).toBe('string');
        expect(result.body.token).not.toBe(null);
        expect(user.id).toBe(userId)

    });

});

afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users`;
    await prisma.$disconnect();
})