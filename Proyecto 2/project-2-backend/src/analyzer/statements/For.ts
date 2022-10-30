import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { BreakLoopEx } from "../exceptions/BreakLoopEx";
import { ContinueLoopEx } from "../exceptions/ContinueLoopEx";
import { Decrement } from "../expressions/Decrement";
import { Increment } from "../expressions/Increment";
import { SymbolTable } from "../sym_table/SymbolTable";
import { Assign } from "./Assign";
import { Declaration } from "./Declaration";

export class For implements IStatement {
  constructor(
    private init: Declaration | Assign,
    private condition: IExpression,
    private increment: Increment | Decrement | Assign,
    private body: IStatement[],
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="For"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}1;`;
    str += `node${this.line}${this.column}1[label="Init"];`;
    str += this.init.graph();
    str += `node${this.line}${this.column} -> node${this.line}${this.column}2;`;
    str += `node${this.line}${this.column}2[label="Condition"];`;
    str += `node${this.line}${this.column}2 -> node${this.line}${this.column}21;`;
    str += `node${this.line}${
      this.column
    }21[label="${this.condition.graph()}"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}3;`;
    str += `node${this.line}${this.column}3[label="Increment"];`;
    str += `node${this.line}${this.column}3 -> node${this.line}${this.column}31;`;
    str += `node${this.line}${
      this.column
    }31[label="${this.increment.graph()}"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}4;`;
    str += `node${this.line}${this.column}4[label="Body"];`;
    this.body.forEach((statement, i) => {
      str += `node${this.line}${this.column}4 -> node${this.line}${this.column}4${i};`;
      str += `node${this.line}${this.column}4${i}[label="Statement"];`;
      str += statement.graph();
    });
    return str;
  }

  execute(sym_table: SymbolTable): void {
    const for_table = new SymbolTable(sym_table, "for");
    this.init.execute(for_table);
    while (Boolean(this.condition.evaluate(for_table)!.value)) {
      try {
        const internal_table = new SymbolTable(for_table, "internal for");
        this.body.forEach((statement) => statement.execute(internal_table));

        if (
          this.increment instanceof Increment ||
          this.increment instanceof Decrement
        ) {
          const eval_value = this.increment.evaluate(for_table);
          for_table.updateSymbol(this.increment.identifier, eval_value.value);
        } else {
          this.increment.execute(for_table);
        }
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
