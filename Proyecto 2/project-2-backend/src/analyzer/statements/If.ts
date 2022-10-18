import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";
import { Elif } from "./Elif";

export class If implements IStatement {
  constructor(
    private condition: IExpression,
    private if_body: IStatement[],
    private elifs: Elif[] | undefined = undefined,
    private else_body: IStatement[] | undefined = undefined
  ) {}

  execute(sym_table: SymbolTable): void {
    let eval_value = this.condition.evaluate(sym_table);
    if (eval_value.type !== Datatype.BOOLEAN) {
      throw new Error("Condition must be boolean");
    }

    if (eval_value.value) {
      const if_table: SymbolTable = new SymbolTable(sym_table);
      this.if_body.forEach((statement) => {
        statement.execute(if_table);
      });
    } else if (this.elifs !== undefined) {
      this.elifs.forEach((elif) => {
        const elif_table: SymbolTable = new SymbolTable(sym_table);
        elif.execute(elif_table);
      });
    } else if (this.else_body !== undefined) {
      const else_table: SymbolTable = new SymbolTable(sym_table);
      this.else_body.forEach((statement) => {
        statement.execute(else_table);
      });
    }
  }
}
