import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Ternary implements IExpression {
  constructor(
    private condition: IExpression,
    private trueExpression: IExpression,
    private falseExpression: IExpression
  ) {}

  evaluate(sym_table: SymbolTable): IReturnEval {
    throw new Error("Method not implemented.");
  }
}
