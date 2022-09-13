import joi from 'joi';
import { TypeUserInsert } from '../types/userTypes';

const signInSchema:joi.ObjectSchema<TypeUserInsert> = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(1).required()
})

export default signInSchema;