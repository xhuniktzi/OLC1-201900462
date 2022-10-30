import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { LogicalOp } from "../enums/EnumLogical";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Logical implements IExpression {
  constructor(
    private left: IExpression,
    private operator: LogicalOp,
    private right: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.left}${this.line}${this.column}[label="Logical"];`;
    str += `node${this.left}${this.line}${this.column} -> node${this.left}${this.line}${this.column}1;`;
    str += `node${this.left}${this.line}${
      this.column
    }1[label="${this.left.graph()}"];`;
    str += `node${this.left}${this.line}${this.column} -> node${this.left}${this.line}${this.column}2;`;
    str += `node${this.left}${this.line}${this.column}2[label="${this.operator}"];`;
    str += `node${this.left}${this.line}${this.column} -> node${this.left}${this.line}${this.column}3;`;
    str += `node${this.left}${this.line}${
      this.column
    }3[label="${this.right.graph()}"];`;
    return str;
  }
  evaluate(sym_table: SymbolTable): IReturnEval {
    const left = this.left.evaluate(sym_table);
    const right = this.right.evaluate(sym_table);

    if (left!.type !== Datatype.BOOLEAN || right!.type !== Datatype.BOOLEAN) {
      throw new Error("Logical operator only works with boolean values");
    }

    switch (this.operator) {
      case LogicalOp.AND:
        return {
          type: Datatype.BOOLEAN,
          value: Boolean(left!.value) && Boolean(right!.value),
        };
      case LogicalOp.OR:
        return {
          type: Datatype.BOOLEAN,
          value: Boolean(left!.value) || Boolean(right!.value),
        };
    }
  }
}
