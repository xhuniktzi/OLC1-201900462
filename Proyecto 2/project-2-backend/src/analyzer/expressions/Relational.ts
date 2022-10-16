import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { RelationalOp } from "../enums/EnumRelational";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Relational implements IExpression {
  constructor(
    private left: IExpression,
    private operator: RelationalOp,
    private right: IExpression
  ) {}

  evaluate(sym_table: SymbolTable): IReturnEval {
    throw new Error("Method not implemented.");
  }
}
