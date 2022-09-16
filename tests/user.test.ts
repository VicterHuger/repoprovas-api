import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/databse";
import { faker } from '@faker-js/faker';
import { userSignUpFactory, userFactory } from '../prisma/factories/userFactory';
import jwt from 'jsonwebtoken';

// beforeEach(async()=>{
//     await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
// })

describe('POST /sign-up', ()=>{
    beforeEach(async()=>{
        await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    })

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
        const result = await supertest(app).post('/sign-up').send(userFactory());
        expect(result.status).toBe(422);
    });

    it('should return 422 if confirm password and password do not match', async()=>{
        const user = userFactory();
        const result = await supertest(app).post('/sign-up').send({
            ...user,
            confirmPassword:faker.internet.password()
    });
        expect(result.status).toBe(422);
    });

    it('should return 422 if an invalid email is supplyied and all others body properties are correct', async()=>{
        const password = faker.internet.password();
        const result = await supertest(app).post('/sign-up').send({
            email:faker.random.alphaNumeric(), 
            password, 
            confirmPassword:password
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if a password with length less than 6 is supplyied and all others body properties are correct', async()=>{
        const password = faker.internet.password(5);
        const result = await supertest(app).post('/sign-up').send({
            email:faker.internet.email(), 
            password, confirmPassword:password
        });
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
        const user = userFactory();
        const result = await supertest(app).post('/sign-up').send({
            ...user,
            confirmPassword:faker.mersenne.rand()
        });
        expect(result.status).toBe(422);
    });

    it('should return 201 and should sign up user on database if a correct body is supplyied', async()=>{
        const insertUser = userSignUpFactory();
        const result = await supertest(app).post('/sign-up').send(insertUser);
        const user = await prisma.user.findUnique({where:{email:insertUser.email}});
        expect(result.status).toBe(201);
        expect(user).not.toBe(null);
    });

    it('should return 409 if a correct body is supplyied and the email passed has already been sign up', async()=>{
        const insertUser = userSignUpFactory();
        await supertest(app).post('/sign-up').send(insertUser);
        const result = await supertest(app).post('/sign-up').send(insertUser);
        expect(result.status).toBe(409);
    });
})

describe('POST /sign-in',()=>{
    beforeEach(async()=>{
        await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    })
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

afterEach(async ()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
})

afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    prisma.$disconnect;
});