import { Guid } from "typescript-guid";
import { IStatement } from "../abstract/IStatement";
import { ContinueLoopEx } from "../exceptions/ContinueLoopEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class ContinueLoop implements IStatement {
  constructor(public line: number, public column: number) {}

  uuid: Guid = Guid.create(); // Unique identifier
  graph(): string {
    return `node${this.uuid} [label="ContinueLoop"];\n`;
  }

  execute(table: SymbolTable): void {
    throw new ContinueLoopEx();
  }
}
