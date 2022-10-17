import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { LogicalOp } from "../enums/EnumLogical";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Logical implements IExpression {
  constructor(
    private left: IExpression,
    private operator: LogicalOp,
    private right: IExpression
  ) {}
  evaluate(sym_table: SymbolTable): IReturnEval {
    const left = this.left.evaluate(sym_table);
    const right = this.right.evaluate(sym_table);

    if (left.type !== Datatype.BOOLEAN || right.type !== Datatype.BOOLEAN) {
      throw new Error("Logical operator only works with boolean values");
    }

    switch (this.operator) {
      case LogicalOp.AND:
        return { type: Datatype.BOOLEAN, value: left.value && right.value };
      case LogicalOp.OR:
        return { type: Datatype.BOOLEAN, value: left.value || right.value };
    }
  }
}
