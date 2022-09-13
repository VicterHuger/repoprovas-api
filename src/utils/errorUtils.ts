import { IErrorMessage } from "../types/errorType"
export function generateThrowErrorMessage(code:string, message:string){
    const error:IErrorMessage ={
        code,
        message
    }
    throw(error);
}