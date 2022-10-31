import { Guid } from "typescript-guid";
import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SemanticErrorEx } from "../exceptions/SemanticErrorEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Increment implements IExpression, IStatement {
  constructor(
    public identifier: string,
    public line: number,
    public column: number
  ) {}

  uuid: Guid = Guid.create(); // Unique identifier
  graph(): string {
    let str: string = `node${this.uuid} [label="Increment"];\n`;
    str += `node${this.uuid} -> node${this.uuid}id [label="${this.identifier}"];\n`;
    return str;
  }

  execute(sym_table: SymbolTable): void {
    const symbol = sym_table.getSymbol(this.identifier);
    if (
      symbol!.datatype === Datatype.INT ||
      symbol!.datatype === Datatype.DOUBLE
    ) {
      sym_table.updateSymbol(this.identifier, Number(symbol!.value) + 1);
    } else {
      throw new SemanticErrorEx(
        "Cannot increment a non numeric value",
        this.line,
        this.column
      );
    }
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
      throw new SemanticErrorEx(
        "Cannot increment a non numeric value",
        this.line,
        this.column
      );
    }
  }
}
