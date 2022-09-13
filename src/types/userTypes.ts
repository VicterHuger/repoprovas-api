import { User } from "@prisma/client";

export type TypeUserInsert = Omit <User, "id">;

export interface IUserSingUp extends User{
    confirmPassword: string
}

export type TypeUserSingUp = Omit <IUserSingUp, "id">;