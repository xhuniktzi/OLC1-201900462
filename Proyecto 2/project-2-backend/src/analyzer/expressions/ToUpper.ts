import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class ToUpper implements IExpression {
  constructor(
    private value: IExpression,
    public line: number,
    public column: number
  ) {}
  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const eval_value = this.value.evaluate(sym_table);
    if (eval_value!.type === Datatype.STRING) {
      return {
        value: eval_value!.value.toString().toUpperCase(),
        type: Datatype.STRING,
      };
    } else {
      throw new Error("Cannot convert to upper case a non string value");
    }
  }
}
