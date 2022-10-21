import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { ReturnEx } from "../exceptions/ReturnEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Return implements IStatement {
  constructor(private expression: IExpression) {}

  execute(sym_table: SymbolTable): void {
    const eval_value = this.expression.evaluate(sym_table);
    throw new ReturnEx(eval_value!);
  }
}
