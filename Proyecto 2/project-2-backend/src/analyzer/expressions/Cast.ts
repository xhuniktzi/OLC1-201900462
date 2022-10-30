import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import fnSemanticCast from "../functions/fnSemanticCast";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Cast implements IExpression {
  constructor(
    private type: Datatype,
    private value: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.value}${this.line}${this.column}[label="Cast"];`;
    str += `node${this.value}${this.line}${this.column} -> node${this.value}${this.line}${this.column}1;`;
    str += `node${this.value}${this.line}${
      this.column
    }1[label="${this.value.graph()}"];`;
    str += `node${this.value}${this.line}${this.column} -> node${this.value}${this.line}${this.column}2;`;
    str += `node${this.value}${this.line}${this.column}2[label="${this.type}"];`;
    return str;
  }
  evaluate(sym_table: SymbolTable): IReturnEval {
    const expr = this.value.evaluate(sym_table);

    if (fnSemanticCast(expr!.type, this.type)) {
      switch (this.type) {
        case Datatype.INT:
          return {
            value: parseInt(expr!.value.toString()),
            type: Datatype.INT,
          };
        case Datatype.DOUBLE:
          return {
            value: parseFloat(expr!.value.toString()),
            type: Datatype.DOUBLE,
          };
        case Datatype.BOOLEAN:
          return {
            value: Boolean(expr!.value),
            type: Datatype.BOOLEAN,
          };
        case Datatype.CHAR:
          return {
            value: expr!.value.toString().charAt(0),
            type: Datatype.CHAR,
          };
        case Datatype.STRING:
          return {
            value: expr!.value.toString(),
            type: Datatype.STRING,
          };
      }
    } else {
      throw new Error(`Cannot cast ${expr!.type} to ${this.type}`);
    }
  }
}
