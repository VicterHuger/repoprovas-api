import { Router } from "express";
import authRouter from '../routes/authRouter';
import testRouter from '../routes/testRouter';

const router:Router = Router();

router.use([authRouter, testRouter]);

export default router;