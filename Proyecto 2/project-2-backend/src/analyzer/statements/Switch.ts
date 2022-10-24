import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { RelationalOp } from "../enums/EnumRelational";
import { BreakLoopEx } from "../exceptions/BreakLoopEx";
import { Relational } from "../expressions/Relational";
import { SymbolTable } from "../sym_table/SymbolTable";
import { Case } from "./Case";

export class Switch implements IStatement {
  public constructor(
    public condition: IExpression,
    public cases: Case[] | undefined,
    public defaultCase: IStatement[] | undefined
  ) {}

  execute(sym_table: SymbolTable): void {
    const switch_table = new SymbolTable(sym_table, "switch");
    try {
      if (this.cases !== undefined) {
        let i = 0;
        this.cases!.forEach((case_eval, index) => {
          if (
            new Relational(
              this.condition,
              RelationalOp.EQUAL,
              case_eval.condition
            ).evaluate(switch_table).value
          ) {
            i = index;
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
