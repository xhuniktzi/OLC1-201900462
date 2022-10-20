import { IStatement } from "../abstract/IStatement";
import { ContinueLoopEx } from "../exceptions/ContinueLoopEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class ContinueLoop implements IStatement {
  constructor() {}

  execute(table: SymbolTable): void {
    throw new ContinueLoopEx();
  }
}
