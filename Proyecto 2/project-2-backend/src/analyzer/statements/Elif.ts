import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Elif implements IStatement {
  constructor(public condition: IExpression, private body: IStatement[]) {}

  execute(sym_table: SymbolTable): void {
    this.body.forEach((statement) => {
      statement.execute(sym_table);
    });
  }
}
