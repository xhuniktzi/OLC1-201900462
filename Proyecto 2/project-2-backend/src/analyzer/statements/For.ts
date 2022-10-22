import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
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
    private body: IStatement[]
  ) {}

  execute(sym_table: SymbolTable): void {
    const for_table = new SymbolTable(sym_table);
    this.init.execute(for_table);
    while (Boolean(this.condition.evaluate(for_table)!.value)) {
      const internal_table = new SymbolTable(for_table);
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
    }
  }
}
