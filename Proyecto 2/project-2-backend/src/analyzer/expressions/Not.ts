import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Not implements IExpression {
  constructor(private expression: IExpression) {}
  evaluate(sym_table: SymbolTable): IReturnEval {
    throw new Error("Method not implemented.");
  }
}
