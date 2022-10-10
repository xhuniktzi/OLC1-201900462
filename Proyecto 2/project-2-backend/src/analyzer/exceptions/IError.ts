import { EnumError } from "./EnumError";

export interface IError {
    type: EnumError;
    message: string;
    line: number;
    column: number;
}