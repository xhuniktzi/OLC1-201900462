import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Round implements IExpression {
  constructor(
    private value: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.value}${this.line}${this.column}[label="Round"];`;
    str += `node${this.value}${this.line}${this.column} -> node${this.value}${this.line}${this.column}1;`;
    str += `node${this.value}${this.line}${
      this.column
    }1[label="${this.value.graph()}"];`;
    return str;
  }

  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const eval_value = this.value.evaluate(sym_table);

    if (
      eval_value!.type === Datatype.DOUBLE ||
      eval_value!.type === Datatype.INT
    ) {
      return {
        value: Math.round(Number(eval_value!.value)),
        type: Datatype.INT,
      };
    }
  }
}
