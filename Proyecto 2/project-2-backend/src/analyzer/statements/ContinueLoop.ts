import { IStatement } from "../abstract/IStatement";
import { ContinueLoopEx } from "../exceptions/ContinueLoopEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class ContinueLoop implements IStatement {
  constructor(public line: number, public column: number) {}

  execute(table: SymbolTable): void {
    throw new ContinueLoopEx();
  }
}
