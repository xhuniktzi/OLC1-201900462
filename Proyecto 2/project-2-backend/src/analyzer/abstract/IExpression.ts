import { SymbolTable } from "../sym_table/SymbolTable";
import { IReturnEval } from "./IReturnEval";
import { ITabulable } from "./ITabulable";

export interface IExpression extends ITabulable {
  evaluate(sym_table: SymbolTable): IReturnEval | undefined;
}
