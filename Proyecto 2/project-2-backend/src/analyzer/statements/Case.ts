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

  public execute(sym_table: SymbolTable): void {
    this.body.forEach((statement) => statement.execute(sym_table));
  }
}
