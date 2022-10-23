import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Case implements IStatement {
  public constructor(
    public readonly condition: IExpression,
    public readonly body: IStatement[]
  ) {}

  public execute(sym_table: SymbolTable): void {
    this.body.forEach((statement) => statement.execute(sym_table));
  }
}
