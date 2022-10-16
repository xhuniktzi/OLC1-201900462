import { SymbolTable } from "../sym_table/SymbolTable";

export interface IStatement {
  execute(sym_table: SymbolTable): void;
}
