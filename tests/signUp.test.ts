import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/databse";

beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
})

describe('Test route to sign up users', ()=>{
    it('Test to verify if the route /sign-up send a status 422, if missis any body param required', async()=>{
        const result = await supertest(app).post('/sign-up').send({});
        expect(result.status).toBe(422); 
    });
    it('Test to verify if the route /sign-up send a status 422, if missis email param required in body', async()=>{
        const result = await supertest(app).post('/sign-up').send({password:'123456', confirmPassword:'123456'});
        expect(result.status).toBe(422);
    });
    it('Test to verify if the route /sign-up send a status 422, if missis password param required in body', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', confirmPassword:'123456'});
        expect(result.status).toBe(422);
    });
    it('Test to verify if the route /sign-up send a status 422, if missis confirmPassword param required in body', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', password:'123456'});
        expect(result.status).toBe(422);
    });
    it('Test to verify if the route /sign-up send a status 422, if password and confirmPassword do not match', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', 
        password:'123456', confirmPassword:'123451'});
        expect(result.status).toBe(422);
    });
    it('Test to verify if the route /sign-up send a status 201 and user was created on database, if all body params are corrected inputeds and the email used was not sign up before', async()=>{
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', password:'123456', confirmPassword:'123456'});
        const user = await prisma.user.findUnique({where:{email:'victor@gmail.com'}})
        expect(result.status).toBe(201);
        expect(user).not.toBe(null);
    });
    it('Test to verify if the route /sign-up send a status 409, if all body params are corrected inputeds and the email used has already been sign up', async()=>{
        await supertest(app).post('/sign-up').send({email:'victor@gmail.com', password:'123456', confirmPassword:'123456'});
        const result = await supertest(app).post('/sign-up').send({email:'victor@gmail.com', password:'123456', confirmPassword:'123456'});
        expect(result.status).toBe(409);
    });
})

afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    prisma.$disconnect;
});