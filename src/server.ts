import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import router from './routes/router';

dotenv.config();

const app:express.Express = express();

app.use([cors(), json(), router, errorHandlerMiddleware]);

const PORT:number = +process.env.PORT || 5001; 

app.listen(PORT, ():void=>console.log(`Server is listening on PORT ${PORT}`));

