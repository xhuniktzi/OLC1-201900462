import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Increment implements IExpression, IStatement {
  constructor(
    public identifier: string,
    public line: number,
    public column: number
  ) {}

  execute(sym_table: SymbolTable): void {
    throw new Error("Method not implemented.");
  }
  evaluate(sym_table: SymbolTable): IReturnEval {
    const symbol = sym_table.getSymbol(this.identifier);
    if (
      symbol!.datatype === Datatype.INT ||
      symbol!.datatype === Datatype.DOUBLE
    ) {
      sym_table.updateSymbol(this.identifier, Number(symbol!.value) + 1);
      return {
        value: symbol!.value,
        type: symbol!.datatype,
      };
    } else {
      throw new Error("Cannot increment a non numeric value");
    }
  }
}
