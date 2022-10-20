import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Print implements IStatement {
  constructor(private text: IExpression) {}
  execute(sym_table: SymbolTable): void {
    sym_table.addConsole(this.text.evaluate(sym_table).value.toString());
  }
}
