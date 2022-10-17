import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { Terminals } from "../enums/EnumTerminals";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Terminal implements IExpression {
  constructor(
    private type: Terminals,
    private value: string | number | boolean
  ) {}

  evaluate(sym_table: SymbolTable): IReturnEval {
    switch (this.type) {
      case Terminals.DECIMAL:
        return { value: Number(this.value), type: Datatype.DOUBLE };
      case Terminals.INTEGER:
        return { value: Number(this.value), type: Datatype.INT };
      case Terminals.STRING:
        return { value: String(this.value), type: Datatype.STRING };
      case Terminals.CHAR:
        return { value: String(this.value), type: Datatype.CHAR };
      case Terminals.LOGICAL:
        return { value: Boolean(this.value), type: Datatype.BOOLEAN };
      case Terminals.ID:
        const symbol = sym_table.getSymbol(this.value.toString());
        if (symbol !== null) {
          switch (symbol!.datatype) {
            case Datatype.INT:
            case Datatype.DOUBLE:
              return { value: Number(symbol!.value), type: symbol!.datatype };
            case Datatype.STRING:
            case Datatype.CHAR:
              return { value: String(symbol!.value), type: symbol!.datatype };
            case Datatype.BOOLEAN:
              return { value: Boolean(symbol!.value), type: symbol!.datatype };
          }
        } else {
          throw new Error(
            `Semantic Error: Variable ${this.value} is not defined.`
          );
        }
    }
  }
}
