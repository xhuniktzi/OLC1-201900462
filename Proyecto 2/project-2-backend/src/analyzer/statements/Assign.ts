import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { IStatement } from "../abstract/IStatement";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Assign implements IStatement {
  constructor(
    private ids: string[],
    private value: IExpression | undefined = undefined
  ) {}

  execute(sym_table: SymbolTable): void {
    const eval_value = this.value!.evaluate(sym_table);

    this.ids.forEach((id) => {
      const symbol = sym_table.getSymbol(id);

      if (symbol!.datatype === eval_value!.type) {
        sym_table.updateSymbol(id, eval_value!.value);
      } else {
        throw new Error("Type mismatch");
      }
    });
  }
}
