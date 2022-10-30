import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Println implements IStatement {
  constructor(
    private text: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="Println"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}1;`;
    str += `node${this.line}${this.column}1[label="${this.text.graph()}"];`;
    return str;
  }
  execute(sym_table: SymbolTable): void {
    const eval_value = this.text.evaluate(sym_table);
    sym_table.addConsole(eval_value!.value.toString() + "\n");
  }
}
