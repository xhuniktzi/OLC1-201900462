import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Not implements IExpression {
  constructor(
    private expression: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str = `node${this.expression}${this.line}${this.column}[label="Not"];`;
    str += `node${this.expression}${this.line}${this.column} -> node${this.expression}${this.line}${this.column}1;`;
    str += `node${this.expression}${this.line}${
      this.column
    }1[label="${this.expression.graph()}"];`;
    return str;
  }
  evaluate(sym_table: SymbolTable): IReturnEval {
    const expr = this.expression.evaluate(sym_table);

    if (expr!.type !== Datatype.BOOLEAN) {
      throw new Error("Logical operator only works with boolean values");
    }

    return { type: Datatype.BOOLEAN, value: !Boolean(expr!.value) };
  }
}
