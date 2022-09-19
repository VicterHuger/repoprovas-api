import supertest from "supertest";
import app from "../src/app";
import prisma from '../src/config/databse';
import { faker } from '@faker-js/faker';
import { testFactory } from "../prisma/factories/testFactory";
import { userSignUpFactory } from '../prisma/factories/userFactory';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { dbInitialFactory } from "../prisma/factories/dbInitialDataFactory";

dotenv.config();

describe('POST /tests/create',()=>{

    beforeEach(async()=>{
        await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
        await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    });

    afterEach(async()=>{
        await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
        await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    })
    
    afterAll(async()=>{
        await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
        await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
        await prisma.$disconnect();
    })

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

    it('should return 404 if the requisition with a valid token sent a not sign up discipline on database', async()=>{
        const userSignUp = userSignUpFactory();

        await supertest(app).post('/sign-up').send(userSignUp);

        delete userSignUp.confirmPassword;

        const loginResult = await supertest(app).post('/sign-in').send(userSignUp);

        await dbInitialFactory();

        const result = await supertest(app).post('/tests/create').set({'Authorization':`Bearer ${loginResult.body.token}`}).send(testFactory('Projeto'));

        expect (result.status).toBe(404);
    });

    it('should return 404 if the requisition with a valid token sent a not sign up teacher on database', async()=>{
        const userSignUp = userSignUpFactory();

        await supertest(app).post('/sign-up').send(userSignUp);

        delete userSignUp.confirmPassword;

        const loginResult = await supertest(app).post('/sign-in').send(userSignUp);

        await dbInitialFactory();

        const result = await supertest(app).post('/tests/create').set({'Authorization':`Bearer ${loginResult.body.token}`}).send(testFactory('Projeto','JavaScript'));

        expect (result.status).toBe(404);
    });

    it('should return 404 if the requisition with a valid token sent a not sign up teacher in a certain discipline on database', async()=>{
        const userSignUp = userSignUpFactory();

        await supertest(app).post('/sign-up').send(userSignUp);

        delete userSignUp.confirmPassword;

        const loginResult = await supertest(app).post('/sign-in').send(userSignUp);

        await dbInitialFactory();

        const result = await supertest(app).post('/tests/create').set({'Authorization':`Bearer ${loginResult.body.token}`}).send(testFactory('Projeto', 'JavaScript',"Bruna Hamori"));

        expect (result.status).toBe(404);
    });

    it('should return 201 and be test type if the requisition with a valid token sent a valid test not sign up before', async()=>{
        const userSignUp = userSignUpFactory();

        await supertest(app).post('/sign-up').send(userSignUp);

        delete userSignUp.confirmPassword;

        const loginResult = await supertest(app).post('/sign-in').send(userSignUp);

        await dbInitialFactory();

        const result = await supertest(app).post('/tests/create').set({'Authorization':`Bearer ${loginResult.body.token}`}).send(testFactory('Projeto', 'JavaScript','Diego Pinho'));

        expect (result.status).toBe(201);
        expect(result.body).toMatchObject(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            pdfUrl: expect.any(String),
            categoryId: expect.any(Number),
            teacherDisciplineId: expect.any(Number)
        }));
    });

    it('should return 409 if the requisition with a valid token sent a valid test that was already sign up', async()=>{
        const userSignUp = userSignUpFactory();

        await supertest(app).post('/sign-up').send(userSignUp);

        delete userSignUp.confirmPassword;

        const loginResult = await supertest(app).post('/sign-in').send(userSignUp);

        await dbInitialFactory();

        const test = testFactory('Projeto', 'JavaScript','Diego Pinho');
         
        await supertest(app).post('/tests/create').set({'Authorization':`Bearer ${loginResult.body.token}`}).send(test);

        const result = await supertest(app).post('/tests/create').set({'Authorization': `Bearer ${loginResult.body.token}`}).send(test);

        expect (result.status).toBe(409);
        
        
    });



});

describe('GET /tests/disciplines', ()=>{
    beforeEach(async()=>{
        await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
        await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
    });

    afterEach(async()=>{
        await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
        await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
    });

    afterAll(async()=>{
        await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY`;
        await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
        await prisma.$disconnect();
    });

    
    it('should return 401 if the requisition is missing headers authorization', async()=>{
        const result = await supertest(app).get('/tests/disciplines');
        expect(result.status).toBe(401);
    })

    it('should return 401 if the requisition with headers Authorization do not present de word Bearer', async()=>{
        const result = await supertest(app).get('/tests/disciplines').set({'Authorization': faker.random.alphaNumeric()});
        expect(result.status).toBe(401);
    });

    it('should return 401 if the requisition with headers Authorization presents only the word Bearer', async()=>{
        const result = await supertest(app).get('/tests/disciplines').set({'Authorization': 'Bearer'});
        expect(result.status).toBe(401);    
    });

    it('should return 401 if the requisition with headers Authorization presents the word Bearer followed by invalid token', async()=>{
        const result = await supertest(app).get('/tests/disciplines').set({'Authorization': `Bearer ${faker.random.alphaNumeric()}`});
        expect(result.status).toBe(401);    
    });

    it('should return 401 if the requisition with headers Authorization presents the word Bearer followed by a token that is expired', async()=>{
        const token:string = jwt.sign({userId:1}, process.env.TOKEN_SECRET_KEY, {expiresIn:1})
        
        const result = await supertest(app).get('/tests/disciplines').set({'Authorization': `Bearer ${token}`});
        
        expect(result.status).toBe(401);    
    });

    it('should return 401 if the requisition with headers Authorization presents the word Bearer followed by a token that there is not relation with a sign up user', async()=>{
        const token:string = jwt.sign({userId:1}, process.env.TOKEN_SECRET_KEY, {expiresIn:process.env.TOKEN_EXPIRES_IN})
        
        const result = await supertest(app).get('/tests/disciplines').set({'Authorization': `Bearer ${token}`});
        
        expect(result.status).toBe(401);    
    });

    it('should return 201 and be object of specified type if the requisition with a valid token sent', async()=>{
        const userSignUp = userSignUpFactory();

        await supertest(app).post('/sign-up').send(userSignUp);

        delete userSignUp.confirmPassword;

        const loginResult = await supertest(app).post('/sign-in').send(userSignUp);

        await dbInitialFactory();

        await supertest(app).post('/tests/create').set({'Authorization':`Bearer ${loginResult.body.token}`}).send(testFactory('Projeto', 'JavaScript','Diego Pinho'));

        const result = await supertest(app).get('/tests/disciplines').set({'Authorization':`Bearer ${loginResult.body.token}`});

        expect (result.status).toBe(200);
        // expect(result.body).toMatchObject(expect.objectContaining({
        //     terms: expect.any(Array)
        // }));

        // expect(result.body.terms[1].disciplines[0]).toMatchObject(expect.objectContaining({
        //     id: expect.any(Number),
        //     name: expect.any(String),
        //     teacherDisciplines: expect.any(Array)
        // }));
        // expect(result.body.terms[1].disciplines[0].teacherDisciplines[0]).toMatchObject(expect.objectContaining({
        //     teacher: expect.any(Object),
        //     tests: expect.any(Array),
        // }));
        // expect(result.body.terms[1].disciplines[0].teacherDisciplines[0].tests[0]).toMatchObject(expect.objectContaining({
        //    category:expect.any(Object),
        // }));

        // expect(result.body.terms[1].disciplines[0].teacherDisciplines[0].tests[0].category).toMatchObject(expect.objectContaining({
        //     id: expect.any(Number),
        //     name: expect.any(String),
        //     tests: expect.any(Array),
        // }));


    });
}); 

