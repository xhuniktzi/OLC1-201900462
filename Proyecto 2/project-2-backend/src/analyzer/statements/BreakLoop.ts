import { IStatement } from "../abstract/IStatement";
import { BreakLoopEx } from "../exceptions/BreakLoopEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class BreakLoop implements IStatement {
  constructor() {}

  execute(table: SymbolTable): void {
    throw new BreakLoopEx();
  }
}
