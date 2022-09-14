import dotenv from  'dotenv';
import app from './app';

dotenv.config();

const PORT:number = +process.env.PORT || 5001; 

app.listen(PORT, ():void=>console.log(`Server is listening on PORT ${PORT}`));

