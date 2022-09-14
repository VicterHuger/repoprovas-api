import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/databse";
import { faker } from '@faker-js/faker';

beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
})

describe('POST /sign-up', ()=>{
    it('should return 422 if it is given an empty body', async()=>{
        const result = await supertest(app).post('/sign-up').send({});
        expect(result.status).toBe(422); 
    });
    it('should return 422 if it is not given an email body property', async()=>{
        const password = faker.internet.password();
        const result = await supertest(app).post('/sign-up').send({password, confirmPassword:password});
        expect(result.status).toBe(422);
    });
    it('should return 422 if it is not given a password body property', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:faker.internet.email(), confirmPassword:faker.internet.password()});
        expect(result.status).toBe(422);
    });
    it('should return 422 if it is not given a confirm password body property', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:faker.internet.email(), password:faker.internet.password});
        expect(result.status).toBe(422);
    });
    it('should return 422 if confirm password and password do not match', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:faker.internet.email(), 
        password:faker.internet.password(), confirmPassword:faker.internet.password()});
        expect(result.status).toBe(422);
    });
    it('should return 422 if an invalid email is supplyied and all others body properties are correct', async()=>{
        const password = faker.internet.password();
        const result = await supertest(app).post('/sign-up').send({email:faker.random.alphaNumeric(), 
        password, confirmPassword:password});
        expect(result.status).toBe(422);
    });
    it('should return 422 if a password with length less than 6 is supplyied and all others body properties are correct', async()=>{
        const password = faker.internet.password(5);
        const result = await supertest(app).post('/sign-up').send({email:faker.internet.email(), 
        password:password, confirmPassword:password});
        expect(result.status).toBe(422);
    });
    it('should return 422 if the email supplyied is not string type and all others body properties are correct', async()=>{
        const password = faker.internet.password();
        const result = await supertest(app).post('/sign-up').send({email:faker.mersenne.rand(), 
        password, confirmPassword:password});
        expect(result.status).toBe(422);
    });
    it('should return 422 if the password supplyied is not string type and all others body properties are correct', async()=>{
        const password = faker.mersenne.rand();
        const result = await supertest(app).post('/sign-up').send({
            email:faker.internet.email(), 
            password,
            confirmPassword:password.toString()
        });
        expect(result.status).toBe(422);
    });
    it('should return 422 if the confirmPassword supplyied is not string type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:faker.internet.email(), 
        password: faker.internet.password()
        , confirmPassword:faker.mersenne.rand()});
        expect(result.status).toBe(422);
    });

    it('should return 201 and should sign up user on database if a correct body is supplyied', async()=>{
        const email = faker.internet.email();
        const password = faker.internet.password();
        const result = await supertest(app).post('/sign-up').send({
            email, 
            password, confirmPassword:password
        });
        const user = await prisma.user.findUnique({where:{email}})
        expect(result.status).toBe(201);
        expect(user).not.toBe(null);
    });
    it('should return 409 if a correct body is supplyied and the email passed has already been sign up', async()=>{
        const email = faker.internet.email();
        const password = faker.internet.password();
        await supertest(app).post('/sign-up').send({
            email,
            password,
            confirmPassword:password
        });
        const result = await supertest(app).post('/sign-up').send({email:email, password, confirmPassword:password});
        expect(result.status).toBe(409);
    });
})

afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    prisma.$disconnect;
});