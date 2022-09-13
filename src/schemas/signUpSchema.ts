import joi from 'joi';
import { TypeUserSingUp } from '../types/userTypes';

const signUpSchema:joi.ObjectSchema<TypeUserSingUp> = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
})

export default signUpSchema;