import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Elif implements IStatement {
  constructor(private condition: IExpression, private body: IStatement[]) {}

  execute(sym_table: SymbolTable): void {
    if (this.condition.evaluate(sym_table).type !== Datatype.BOOLEAN) {
      throw new Error("Condition must be boolean");
    }

    if (this.condition.evaluate(sym_table).value) {
      this.body.forEach((statement) => {
        statement.execute(sym_table);
      });
    }
  }
}
