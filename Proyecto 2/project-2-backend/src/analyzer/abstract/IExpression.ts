import { SymbolTable } from "../sym_table/SymbolTable";
import { IReturnEval } from "./IReturnEval";

export interface IExpression {
  evaluate(sym_table: SymbolTable): IReturnEval;
}
