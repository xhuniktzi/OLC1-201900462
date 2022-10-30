import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Ternary implements IExpression {
  constructor(
    private condition: IExpression,
    private trueExpression: IExpression,
    private falseExpression: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.condition}${this.line}${this.column}[label="Ternary"];`;
    str += `node${this.condition}${this.line}${this.column} -> node${this.condition}${this.line}${this.column}1;`;
    str += `node${this.condition}${this.line}${
      this.column
    }1[label="${this.condition.graph()}"];`;
    str += `node${this.condition}${this.line}${this.column} -> node${this.condition}${this.line}${this.column}2;`;
    str += `node${this.condition}${this.line}${
      this.column
    }2[label="${this.trueExpression.graph()}"];`;
    str += `node${this.condition}${this.line}${this.column} -> node${this.condition}${this.line}${this.column}3;`;
    str += `node${this.condition}${this.line}${
      this.column
    }3[label="${this.falseExpression.graph()}"];`;
    return str;
  }

  evaluate(sym_table: SymbolTable): IReturnEval {
    const condition = this.condition.evaluate(sym_table);
    if (condition!.type !== Datatype.BOOLEAN) {
      throw new Error("Ternary condition! must be boolean");
    }

    if (condition!.value) {
      return this.trueExpression.evaluate(sym_table)!;
    } else {
      return this.falseExpression.evaluate(sym_table)!;
    }
  }
}
