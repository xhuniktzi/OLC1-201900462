import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { LogicalOp } from "../enums/EnumLogical";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Logical implements IExpression {
  constructor(
    private left: IExpression,
    private operator: LogicalOp,
    private right: IExpression
  ) {}
  evaluate(sym_table: SymbolTable): IReturnEval {
    throw new Error("Method not implemented.");
  }
}
