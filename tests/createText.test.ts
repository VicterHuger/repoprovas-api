import supertest from "supertest";
import app from "../src/app";
import prisma from '../src/config/databse';
import { faker } from '@faker-js/faker';
import { testFactory } from "../prisma/factories/testFactory";
import { userSignUpFactory } from '../prisma/factories/userFactory';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
});

describe('POST /texts/create',()=>{

    it('should return 422 if an empty body is sent', async()=>{
        const result = await supertest(app).post('/tests/create').send({});
        expect(result.status).toBe(422)
    });

    it('should return 422 if it is not given a name property with all other body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            discipline: faker.random.alpha(10),
            teacher: faker.name.fullName(),
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if it is not given a pdfUrl property with all other body properties are correct',async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(10),
            category:faker.random.alphaNumeric(5),
            discipline: faker.random.alpha(10),
            teacher: faker.name.fullName(),
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if it is not given a category property with all other body properties are correct',async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(10),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            discipline: faker.random.alpha(10),
            teacher: faker.name.fullName(),
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if it is not given a discipline property with all other body properties are correct',async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(10),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            teacher: faker.name.fullName(),
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if it is not given a teacher property with all other body properties are correct',async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(10),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            discipline: faker.random.alpha(10),
        });
        expect(result.status).toBe(422);
    });

    it('should return 422 if the name supplyied is less then 1 character  and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: '',
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            discipline: faker.random.alpha(10),
            teacher: faker.name.fullName()
        })
        expect(result.status).toBe(422);
    });

    it('should return 422 if the name supplyied is not string type  and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.mersenne.rand(),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            discipline: faker.random.alpha(10),
            teacher: faker.name.fullName()
        })
        expect(result.status).toBe(422);
    });

    it('should return 422 if the pdfUrl supplyied is not a url pfd type and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(),
            pdfUrl:faker.random.alphaNumeric(),
            category:faker.random.alphaNumeric(5),
            discipline: faker.random.alpha(10),
            teacher: faker.name.fullName()
        })
        expect(result.status).toBe(422);
    });

    it('should return 422 if the category supplyied is less then 1 character  and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:'',
            discipline: faker.random.alpha(10),
            teacher: faker.name.fullName()
        })
        expect(result.status).toBe(422);
    });

    it('should return 422 if the category supplyied is not string type  and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.mersenne.rand(),
            discipline: faker.random.alpha(10),
            teacher: faker.name.fullName()
        })
        expect(result.status).toBe(422);
    });

    it('should return 422 if the discipline supplyied is less then 1 character  and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            discipline: '',
            teacher: faker.name.fullName()
        })
        expect(result.status).toBe(422);
    });

    it('should return 422 if the discipline supplyied is not string type  and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            discipline: faker.mersenne.rand(),
            teacher: faker.name.fullName()
        })
        expect(result.status).toBe(422);
    });

    it('should return 422 if the teacher supplyied is less then 1 character  and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            discipline: faker.random.alpha(10),
            teacher: ''
        })
        expect(result.status).toBe(422);
    });

    it('should return 422 if the discipline supplyied is not string type  and all others body properties are correct', async()=>{
        const result = await supertest(app).post('/tests/create').send({
            name: faker.random.alpha(),
            pdfUrl:`${faker.internet.avatar()}.pdf`,
            category:faker.random.alphaNumeric(5),
            discipline: faker.random.alpha(10),
            teacher: faker.mersenne.rand()
        })
        expect(result.status).toBe(422);
    });

    it('should return 401 if the requisition is missing headers authorization', async()=>{
        const result = await supertest(app).post('/tests/create').send(testFactory());
        expect(result.status).toBe(401);
    })

    it('should return 401 if the requisition with headers Authorization do not present de word Bearer', async()=>{
        const result = await supertest(app).post('/tests/create').set({'Authorization': faker.random.alphaNumeric()}).send(testFactory());
        expect(result.status).toBe(401);
    });

    it('should return 401 if the requisition with headers Authorization presents only the word Bearer', async()=>{
        const result = await supertest(app).post('/tests/create').set({'Authorization': 'Bearer'}).send(testFactory());
        expect(result.status).toBe(401);    
    });

    it('should return 401 if the requisition with headers Authorization presents the word Bearer followed by invalid token', async()=>{
        const result = await supertest(app).post('/tests/create').set({'Authorization': `Bearer ${faker.random.alphaNumeric()}`}).send(testFactory());
        expect(result.status).toBe(401);    
    });

    it('should return 401 if the requisition with headers Authorization presents the word Bearer followed by a token that is expired', async()=>{
        const token:string = jwt.sign({userId:1}, process.env.TOKEN_SECRET_KEY, {expiresIn:1})
        
        const result = await supertest(app).post('/tests/create').set({'Authorization': `Bearer ${token}`}).send(testFactory());
        
        expect(result.status).toBe(401);    
    });

    it('should return 401 if the requisition with headers Authorization presents the word Bearer followed by a token that there is not relation with a sign up user', async()=>{
        const token:string = jwt.sign({userId:1}, process.env.TOKEN_SECRET_KEY, {expiresIn:process.env.TOKEN_EXPIRES_IN})
        
        const result = await supertest(app).post('/tests/create').set({'Authorization': `Bearer ${token}`}).send(testFactory());
        
        expect(result.status).toBe(401);    
    });

    it('should return 404 if the requisition with a valid token sent a not sign up category on database', async()=>{
        const userSignUp = userSignUpFactory();

        await supertest(app).post('/sign-up').send(userSignUp);

        delete userSignUp.confirmPassword
        
        const loginResult = await supertest(app).post('/sign-in').send({...userSignUp});

        const result = await supertest(app).post('/tests/create').set({'Authorization':`Bearer ${loginResult.body.token}`}).send(testFactory());
       
        expect(result.status).toBe(404);
    });

})

afterAll(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    await prisma.$disconnect();
})