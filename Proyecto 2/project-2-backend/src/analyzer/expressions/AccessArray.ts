import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { SymbolTable } from "../sym_table/SymbolTable";

export class AccessArray implements IExpression {
  constructor(
    private id: string,
    private index: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.id}${this.line}${this.column}[label="AccessArray"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}1;`;
    str += `node${this.id}${this.line}${this.column}1[label="${this.id}"];`;

    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}2;`;
    str += `node${this.id}${this.line}${this.column}2[label="["];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}3;`;
    str += `node${this.id}${this.line}${
      this.column
    }3[label="${this.index.graph()}"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}4;`;
    str += `node${this.id}${this.line}${this.column}4[label="]"];`;
    return str;
  }

  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const eval_value = this.index.evaluate(sym_table);
    if (eval_value!.value < 0) {
      throw new Error("Index out of bounds");
    } else {
      const result = sym_table.getArraySymbol(
        this.id,
        Number(eval_value!.value)
      );

      return {
        value: result.value,
        type: result.datatype,
      };
    }
  }
}
