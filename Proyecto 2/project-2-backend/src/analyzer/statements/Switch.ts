import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { RelationalOp } from "../enums/EnumRelational";
import { Relational } from "../expressions/Relational";
import { SymbolTable } from "../sym_table/SymbolTable";
import { BreakLoop } from "./BreakLoop";
import { Case } from "./Case";

export class Switch implements IStatement {
  public constructor(
    public condition: IExpression,
    public cases: Case[] | undefined,
    public defaultCase: IStatement[] | undefined
  ) {}

  execute(sym_table: SymbolTable): void {
    const switch_table = new SymbolTable(sym_table);
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
      if (error instanceof BreakLoop) return;
    }

    if (this.defaultCase !== undefined) {
      this.defaultCase.forEach((statement) => statement.execute(switch_table));
    }
  }
}
