import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app:express.Express = express();

app.use([cors(), json]);

const PORT:number = +process.env.PORT || 5001; 

app.listen(PORT, ():void=>console.log(`Server is listening on PORT ${PORT}`));

