import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { RelationalOp } from "../enums/EnumRelational";
import fnSemanticCompare from "../functions/fnSemanticCompare";
import fnSemanticRelational from "../functions/fnSemanticRelational";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Relational implements IExpression {
  constructor(
    private left: IExpression,
    private operator: RelationalOp,
    private right: IExpression,
    public line: number,
    public column: number
  ) {}

  evaluate(sym_table: SymbolTable): IReturnEval {
    const left = this.left.evaluate(sym_table);
    const right = this.right.evaluate(sym_table);

    switch (this.operator) {
      case RelationalOp.EQUAL:
      case RelationalOp.NOT_EQUAL:
        return fnSemanticCompare(
          left!.type,
          right!.type,
          left!.value,
          right!.value,
          this.operator
        );
      case RelationalOp.GREATER_THAN:
      case RelationalOp.GREATER_THAN_EQUAL:
      case RelationalOp.LESS_THAN:
      case RelationalOp.LESS_THAN_EQUAL:
        return fnSemanticRelational(
          left!.type,
          right!.type,
          left!.value,
          right!.value,
          this.operator
        );
    }
  }
}
