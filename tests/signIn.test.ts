import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/databse";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { userFactory, userSignUpFactory } from '../prisma/factories/userFactory';

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
        const result = await supertest(app).post('/sign-in').send({
            password:faker.internet.password()
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if it is not given a password body property' ,async()=>{
        const result = await supertest(app).post('/sign-in').send({
            email:faker.internet.email()
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if an invalid email is supplyied and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-in').send({
            email:faker.random.alphaNumeric(), 
            password: faker.internet.password()});
        expect(result.status).toBe(422);
    });

    it('should return 422 if a password with length less than 1 is supplyied and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-in').send({
            email:faker.internet.email(), 
            password:''
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if the email supplyied is not string type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({
            email:faker.mersenne.rand(), 
            password:faker.internet.password()
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if the password supplyied is not string type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({
            email:faker.internet.email(), 
            password:faker.mersenne.rand()
        });
        expect(result.status).toBe(422);
    });

    it('should return with status 401 if the email passed was not sign-up and all body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-in').send(userFactory());
        expect(result.status).toBe(401);
    });

    it('should return with status 401 if the password passed is not correct for an email sign-up and all body properties are correct', async()=>{
        const userSignUp = userSignUpFactory();
        await supertest(app).post('/sign-up').send(userSignUp);
        const result = await supertest(app).post('/sign-in').send({
            email:userSignUp.email, 
            password:faker.internet.password()
        });
        expect(result.status).toBe(401);
    });

    it('should return with status 200 and a valid token for the user, if the all the required body properties are correct and the user has previously sign-up', async()=>{

        const userSignUp = userSignUpFactory();

        await supertest(app).post('/sign-up').send(userSignUp);

        const user = await prisma.user.findUnique({where:{email: userSignUp.email}});
        
        const result = await supertest(app).post('/sign-in').send({email:userSignUp.email, password:userSignUp.password});

        const {userId}= jwt.verify(result.body.token, process.env.TOKEN_SECRET_KEY) as {userId:number};

        expect(result.status).toBe(200);
        expect(typeof result.body.token).toBe('string');
        expect(result.body.token).not.toBe(null);
        expect(user.id).toBe(userId);

    });

});

afterEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
})

afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    await prisma.$disconnect();
})