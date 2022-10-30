import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class ToLower implements IExpression {
  constructor(
    private value: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.value}${this.line}${this.column}[label="ToLower"];`;
    str += `node${this.value}${this.line}${this.column} -> node${this.value}${this.line}${this.column}1;`;
    str += `node${this.value}${this.line}${
      this.column
    }1[label="${this.value.graph()}"];`;
    return str;
  }
  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const eval_value = this.value.evaluate(sym_table);
    if (eval_value!.type === Datatype.STRING) {
      return {
        value: eval_value!.value.toString().toLowerCase(),
        type: Datatype.STRING,
      };
    } else {
      throw new Error("Cannot convert to lower case a non string value");
    }
  }
}
