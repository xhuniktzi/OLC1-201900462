import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "./SymbolTable";

export interface ISymbol {
  id: string;
  datatype: Datatype;
  line: number;
  column: number;
  value: number | string | boolean | SymbolTable;
}
