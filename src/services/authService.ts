import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/authRepository';
import { generateThrowErrorMessage } from "../utils/errorUtils";
import { User } from '@prisma/client';

export async function createUser(email:string, password:string){
    const user:User|null = await authRepository.findUserByEmail(email);
    if (!!user && email===user.email) generateThrowErrorMessage("Conflict","This e-mail was already registered!");
    const hashPassword:string = bcrypt.hashSync(password, 10);
    const result:User = await authRepository.createUser({email, password:hashPassword});
    if(!result) generateThrowErrorMessage("InternalServerError", "Something went wrong and it was not possible to create a new user");
    return;
    
}

export async function singInUser(email:string, password:string){
    const user:User|null = await authRepository.findUserByEmail(email);

    if(user===null || email!==user.email) generateThrowErrorMessage("Unauthorized", "Email or password invalid!");

    if(!bcrypt.compareSync(password, user.password)) generateThrowErrorMessage("Unauthorized","Email or password invalid!");

    const token:string = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET_KEY, {expiresIn:process.env.TOKEN_EXPIRES_IN});
    
    return token;
}

export async function findUserById(userId:number){
    const user:User|null = await authRepository.findUserById(userId);
    if(!user) generateThrowErrorMessage("Unauthorized", "Invalid token");
    return;
}