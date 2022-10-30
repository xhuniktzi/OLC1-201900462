import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { ReturnEx } from "../exceptions/ReturnEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Return implements IStatement {
  constructor(
    private expression: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="Return"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}1;`;
    str += `node${this.line}${
      this.column
    }1[label="${this.expression.graph()}"];`;
    return str;
  }

  execute(sym_table: SymbolTable): void {
    const eval_value = this.expression.evaluate(sym_table);
    throw new ReturnEx(eval_value!);
  }
}
