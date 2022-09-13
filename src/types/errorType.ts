export interface IErrorMessage{
    code:string,
    message:string
}

export interface IErrorExtended extends Error{
    code?:string
}