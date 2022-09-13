import joi from 'joi';
import { TypeTestSchema } from '../types/testType';

const testSchema:joi.ObjectSchema<TypeTestSchema> = joi.object({
    name: joi.string().min(1).required(),
    pdfUrl: joi.string().uri().required(),
    category: joi.string().min(1).required(),
    discipline: joi.string().min(1).required(),
    teacher: joi.string().min(1).required()
});

export default testSchema;