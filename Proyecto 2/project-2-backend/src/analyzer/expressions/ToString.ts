import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";

import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class ToString implements IExpression {
  constructor(
    private expr: IExpression,
    public line: number,
    public column: number
  ) {}

  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const eval_value = this.expr.evaluate(sym_table);

    if (
      eval_value!.type === Datatype.STRING ||
      eval_value!.type === Datatype.CHAR
    ) {
      throw new Error(
        "Semantic error: The function toString expects a string or a boolean"
      );
    } else {
      return {
        value: eval_value!.value.toString(),
        type: Datatype.STRING,
      };
    }
  }
}
