import { Router } from "express";
import * as testController from '../controllers/testController';
import { tokenValidation } from "../middlewares/tokenValidation";
import { validateSchema } from "../middlewares/validateSchema";
import testSchema from "../schemas/testSchema";
import { TypeTestSchema } from "../types/testType";


const router:Router = Router();

router.post('/tests/create', validateSchema<TypeTestSchema>(testSchema), tokenValidation, testController.createTest);

router.get('/tests/disciplines', tokenValidation, testController.listTestsPerDiscipline )

export default router;