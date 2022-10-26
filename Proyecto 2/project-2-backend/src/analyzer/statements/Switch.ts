import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { RelationalOp } from "../enums/EnumRelational";
import { BreakLoopEx } from "../exceptions/BreakLoopEx";
import { Relational } from "../expressions/Relational";
import fnSemanticRelational from "../functions/fnSemanticRelational";
import { SymbolTable } from "../sym_table/SymbolTable";
import { Case } from "./Case";

export class Switch implements IStatement {
  public constructor(
    public condition: IExpression,
    public cases: Case[] | undefined,
    public defaultCase: IStatement[] | undefined,
    public line: number,
    public column: number
  ) {}

  execute(sym_table: SymbolTable): void {
    const switch_table = new SymbolTable(sym_table, "switch");
    try {
      if (this.cases !== undefined) {
        let i = 0;
        this.cases!.forEach((case_eval, index) => {
          const left_op = this.condition.evaluate(switch_table);
          const right_op = case_eval.condition.evaluate(switch_table);
          if (
            fnSemanticRelational(
              left_op!.type,
              right_op!.type,
              left_op!.value,
              right_op!.value,
              RelationalOp.EQUAL
            )
          ) {
            i = index;
            return;
          }
        });

        this.cases.forEach((case_eval, index) => {
          if (index >= i) {
            case_eval.execute(switch_table);
          }
        });
      }
    } catch (error) {
      if (error instanceof BreakLoopEx) return;
      else throw error;
    }

    if (this.defaultCase !== undefined) {
      this.defaultCase.forEach((statement) => statement.execute(switch_table));
    }
  }
}
