import { IStatement } from "../abstract/IStatement";
import { BreakLoopEx } from "../exceptions/BreakLoopEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class BreakLoop implements IStatement {
  constructor(public line: number, public column: number) {}
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="BreakLoop"];`;
    return str;
  }

  execute(table: SymbolTable): void {
    throw new BreakLoopEx();
  }
}
