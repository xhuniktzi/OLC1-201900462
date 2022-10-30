import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Case implements IStatement {
  public constructor(
    public condition: IExpression,
    public body: IStatement[],
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="Case"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}1;`;
    str += `node${this.line}${
      this.column
    }1[label="${this.condition.graph()}"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}2;`;
    str += `node${this.line}${this.column}2[label="Body"];`;
    this.body.forEach((statement, i) => {
      str += `node${this.line}${this.column}2 -> node${this.line}${this.column}2${i};`;
      str += `node${this.line}${this.column}2${i}[label="Statement"];`;
      str += statement.graph();
    });
    return str;
  }

  public execute(sym_table: SymbolTable): void {
    this.body.forEach((statement) => statement.execute(sym_table));
  }
}
