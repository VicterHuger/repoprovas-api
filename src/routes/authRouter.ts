import { Router } from "express";
import * as authController from '../controllers/authController';
import { validateSchema } from "../middlewares/validateSchema";
import { TypeUserInsert,  TypeUserSingUp } from "../types/userTypes";
import signUpSchema from "../schemas/signUpSchema";
import signInSchema from "../schemas/signInSchema";

const router: Router = Router();

router.post('/sign-up', validateSchema<TypeUserSingUp>(signUpSchema), authController.createUser);

router.post('/sign-in', validateSchema<TypeUserInsert>(signInSchema), authController.singInUser);

export default router;

