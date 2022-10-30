import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { SymbolTable } from "../sym_table/SymbolTable";

export class AccessMatrix implements IExpression {
  constructor(
    private id: string,
    private row: IExpression,
    private col: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.id}${this.line}${this.column}[label="AccessMatrix"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}1;`;
    str += `node${this.id}${this.line}${this.column}1[label="${this.id}"];`;

    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}2;`;
    str += `node${this.id}${this.line}${this.column}2[label="["];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}3;`;
    str += `node${this.id}${this.line}${
      this.column
    }3[label="${this.row.graph()}"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}4;`;
    str += `node${this.id}${this.line}${this.column}4[label=","];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}5;`;
    str += `node${this.id}${this.line}${
      this.column
    }5[label="${this.col.graph()}"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}6;`;
    str += `node${this.id}${this.line}${this.column}6[label="]"];`;

    return str;
  }
  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    if (this.row.evaluate(sym_table)!.value < 0) {
      throw new Error("Index out of bounds");
    } else {
      const result = sym_table.getMatrixSymbol(
        this.id,
        Number(this.row.evaluate(sym_table)!.value),
        Number(this.col.evaluate(sym_table)!.value)
      );

      return {
        value: result.value,
        type: result.datatype,
      };
    }
  }
}
