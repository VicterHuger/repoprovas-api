import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/databse";

beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
})

describe('POST /sign-up', ()=>{
    it('should return 422 if it is given an empty body', async()=>{
        const result = await supertest(app).post('/sign-up').send({});
        expect(result.status).toBe(422); 
    });
    it('should return 422 if it is not given an email body property', async()=>{
        const result = await supertest(app).post('/sign-up').send({password:'123456', confirmPassword:'123456'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if it is not given a password body property', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', confirmPassword:'123456'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if it is not given a confirm password body property', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', password:'123456'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if confirm password and password do not match', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', 
        password:'123456', confirmPassword:'123451'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if an invalid email is supplyied and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'123anything', 
        password:'123456', confirmPassword:'123456'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if a password with length less than 6 is supplyied and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'teste@gmail.com', 
        password:'12345', confirmPassword:'12345'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if the email supplyied is not string type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:123, 
        password:'123456', confirmPassword:'123456'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if the password supplyied is not string type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'teste@gmail.com', 
        password:123456, confirmPassword:'123456'});
        expect(result.status).toBe(422);
    });
    it('should return 422 if the confirmPassword supplyied is not string type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'teste@gmail.com', 
        password:'123456', confirmPassword:123456});
        expect(result.status).toBe(422);
    });

    it('should return 201 and should sign up user on database if a correct body is supplyied', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', password:'123456', confirmPassword:'123456'});
        const user = await prisma.user.findUnique({where:{email:'victor@gmail.com'}})
        expect(result.status).toBe(201);
        expect(user).not.toBe(null);
    });
    it('should return 409 if a correct body is supplyied and the email passed has already been sign up', async()=>{
        await supertest(app).post('/sign-up').send({email:'victor@gmail.com', password:'123456', confirmPassword:'123456'});
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', password:'123456', confirmPassword:'123456'});
        expect(result.status).toBe(409);
    });
})

afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    prisma.$disconnect;
});