import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class TypeOf implements IExpression {
  constructor(
    private value: IExpression,
    public line: number,
    public column: number
  ) {}
  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const eval_value = this.value.evaluate(sym_table);
    switch (eval_value!.type) {
      case Datatype.INT:
        return {
          value: "int",
          type: Datatype.STRING,
        };
      case Datatype.DOUBLE:
        return {
          value: "double",
          type: Datatype.STRING,
        };
      case Datatype.STRING:
        return {
          value: "string",
          type: Datatype.STRING,
        };
      case Datatype.BOOLEAN:
        return {
          value: "boolean",
          type: Datatype.STRING,
        };
      case Datatype.CHAR:
        return {
          value: "char",
          type: Datatype.STRING,
        };
    }
  }
}
