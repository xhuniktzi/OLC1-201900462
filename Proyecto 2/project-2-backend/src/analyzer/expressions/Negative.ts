import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Negative implements IExpression {
  constructor(private expression: IExpression) {}

  evaluate(sym_table: SymbolTable): IReturnEval {
    const result = this.expression.evaluate(sym_table);

    if (result.type !== Datatype.DOUBLE && result.type !== Datatype.INT) {
      throw new Error("Negative operator only works with number values");
    }

    return { type: result.type, value: -Number(result.value) };
  }
}
