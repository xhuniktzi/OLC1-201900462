import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Negative implements IExpression {
  constructor(
    private expression: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str = `node${this.expression}${this.line}${this.column}[label="Negative"];`;
    str += `node${this.expression}${this.line}${this.column} -> node${this.expression}${this.line}${this.column}1;`;
    str += `node${this.expression}${this.line}${
      this.column
    }1[label="${this.expression.graph()}"];`;
    return str;
  }

  evaluate(sym_table: SymbolTable): IReturnEval {
    const result = this.expression.evaluate(sym_table);

    if (result!.type !== Datatype.DOUBLE && result!.type !== Datatype.INT) {
      throw new Error("Negative operator only works with number values");
    }

    return { type: result!.type, value: -Number(result!.value) };
  }
}
