import { SymbolTable } from "../sym_table/SymbolTable";
import { ITabulable } from "./ITabulable";

export interface IStatement extends ITabulable {
  execute(sym_table: SymbolTable): void;
}
