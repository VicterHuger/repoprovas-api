import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/databse";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
})

describe('POST /sign-in',()=>{
    it('should return 422 if it is given an empty body', async()=>{
        const result = await supertest(app).post('/sign-in').send({});
        expect(result.status).toBe(422);
    });

    it('should return 422 if it is not given an email body property' ,async()=>{
        const result = await supertest(app).post('/sign-in').send({password:'123'});
        expect(result.status).toBe(422);
    });

    it('should return 422 if it is not given a password body property' ,async()=>{
        const result = await supertest(app).post('/sign-in').send({email:'victor@email.com'});
        expect(result.status).toBe(422);
    });

    it('should return 422 if an invalid email is supplyied and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-in').send({email:'123'});
        expect(result.status).toBe(422);
    });

    it('should return 422 if a password with length less than 1 is supplyied and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-in').send({email:'victor@email.com', password:'123'});
        expect(result.status).toBe(422);
    });

    it('should return 422 if the email supplyied is not string type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:123, 
        password:'123456'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if the password supplyied is not string type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'teste@gmail.com', 
        password:123456});
        expect(result.status).toBe(422);
    });

    it('should return with status 401 if the email passed was not sign-up and all body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-in').send({email:'teste@gmail.com', password:'123456'});
        expect(result.status).toBe(401);
    });

    it('should return with status 401 if the password passed is not correct for an email sign-up and all body properties are correct', async()=>{
        await supertest(app).post('/sign-up').send({email:'teste@gmail.com', password:'123456', confirmPassword:'123456'});
        const result = await supertest(app).post('/sign-in').send({email:'teste@gmail.com', password:'123457'});
        expect(result.status).toBe(401);
    });

    it('should return with status 200 and a valid token for the user, if the all the required body properties are correct and the user has previously sign-up', async()=>{
        
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