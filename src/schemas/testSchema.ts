import joi from 'joi';
import { TypeTestSchema } from '../types/testType';

const testSchema:joi.ObjectSchema<TypeTestSchema> = joi.object({
    name: joi.string().min(1).required(),
    pdfUrl: joi.string().uri().pattern(/^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?(.pdf)$/).required(),
    category: joi.string().min(1).required(),
    discipline: joi.string().min(1).required(),
    teacher: joi.string().min(1).required()
});

export default testSchema;