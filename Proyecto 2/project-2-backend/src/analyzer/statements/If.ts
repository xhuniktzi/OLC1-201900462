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
    const eval_value = this.condition.evaluate(sym_table);
    if (eval_value!.type !== Datatype.BOOLEAN) {
      throw new Error("Condition must be boolean");
    }

    if (Boolean(eval_value!.value)) {
      const if_table: SymbolTable = new SymbolTable(sym_table, "if");
      this.if_body.forEach((statement) => {
        statement.execute(if_table);
      });
      return;
    }
    if (this.elifs !== undefined) {
      for (const elif of this.elifs) {
        const conditional = elif.condition.evaluate(sym_table);
        if (conditional!.type !== Datatype.BOOLEAN) {
          throw new Error("Condition must be boolean");
        }

        if (Boolean(conditional!.value)) {
          const elif_table: SymbolTable = new SymbolTable(sym_table, "elif");
          elif.execute(elif_table);
          return;
        }
      }
    }

    if (!Boolean(eval_value!.value)) {
      if (this.else_body !== undefined) {
        const else_table: SymbolTable = new SymbolTable(sym_table, "else");
        this.else_body.forEach((statement) => {
          statement.execute(else_table);
        });
        return;
      }
    }
  }
}
