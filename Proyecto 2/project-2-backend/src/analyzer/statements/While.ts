import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { BreakLoopEx } from "../exceptions/BreakLoopEx";
import { ContinueLoopEx } from "../exceptions/ContinueLoopEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class While implements IStatement {
  constructor(
    private condition: IExpression,
    private body: IStatement[],
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="While"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}1;`;
    str += `node${this.line}${
      this.column
    }1[label="${this.condition.graph()}"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}2;`;
    str += `node${this.line}${this.column}2[label="Body"];`;
    this.body.forEach((statement, i) => {
      str += `node${this.line}${this.column}2 -> node${this.line}${this.column}2${i};`;
      str += `node${this.line}${this.column}2${i}[label="Statement"];`;
      str += statement.graph();
    });
    return str;
  }

  execute(sym_table: SymbolTable): void {
    const eval_value = this.condition.evaluate(sym_table);
    while (Boolean(eval_value!.value)) {
      try {
        const while_table: SymbolTable = new SymbolTable(sym_table, "while");
        this.body.forEach((statement) => {
          statement.execute(while_table);
        });
      } catch (error: unknown) {
        if (error instanceof ContinueLoopEx) {
          continue;
        } else if (error instanceof BreakLoopEx) {
          break;
        } else {
          throw error;
        }
      }
    }
  }
}
