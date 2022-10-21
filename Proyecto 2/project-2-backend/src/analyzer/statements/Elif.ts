import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Elif implements IStatement {
  constructor(private condition: IExpression, private body: IStatement[]) {}

  execute(sym_table: SymbolTable): void {
    const eval_value = this.condition.evaluate(sym_table);
    if (eval_value!.type !== Datatype.BOOLEAN) {
      throw new Error("Condition must be boolean");
    }

    if (eval_value!.value) {
      this.body.forEach((statement) => {
        statement.execute(sym_table);
      });
    }
  }
}
