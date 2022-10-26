import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Ternary implements IExpression {
  constructor(
    private condition: IExpression,
    private trueExpression: IExpression,
    private falseExpression: IExpression,
    public line: number,
    public column: number
  ) {}

  evaluate(sym_table: SymbolTable): IReturnEval {
    const condition = this.condition.evaluate(sym_table);
    if (condition!.type !== Datatype.BOOLEAN) {
      throw new Error("Ternary condition! must be boolean");
    }

    if (condition!.value) {
      return this.trueExpression.evaluate(sym_table)!;
    } else {
      return this.falseExpression.evaluate(sym_table)!;
    }
  }
}
