import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Decrement implements IExpression {
  constructor(private identifier: string) {}

  evaluate(sym_table: SymbolTable): IReturnEval {
    const symbol = sym_table.getSymbol(this.identifier);
    if (
      symbol!.datatype === Datatype.INT ||
      symbol!.datatype === Datatype.DOUBLE
    ) {
      sym_table.updateSymbol(this.identifier, Number(symbol!.value) - 1);
      return {
        value: symbol!.value,
        type: symbol!.datatype,
      };
    } else {
      throw new Error("Cannot decrement a non numeric value");
    }
  }
}
