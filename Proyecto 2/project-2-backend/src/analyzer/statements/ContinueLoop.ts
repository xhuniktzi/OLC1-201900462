import { IStatement } from "../abstract/IStatement";
import { ContinueLoopEx } from "../exceptions/ContinueLoopEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class ContinueLoop implements IStatement {
  constructor(public line: number, public column: number) {}
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="ContinueLoop"];`;
    return str;
  }

  execute(table: SymbolTable): void {
    throw new ContinueLoopEx();
  }
}
