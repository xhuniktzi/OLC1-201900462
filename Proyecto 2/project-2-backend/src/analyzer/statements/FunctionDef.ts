import { ICallable } from "../abstract/ICallable";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { IParam } from "../abstract/IParam";
import { SymbolTable } from "../sym_table/SymbolTable";

export class FunctionDef implements ICallable {
  constructor(
    public id: string,
    public params: IParam[] | undefined,
    public datatype: Datatype,
    public body: IStatement[],
    public line: number,
    public column: number
  ) {}

  execute(sym_table: SymbolTable): void {
    sym_table.addFunction(this);
  }
}
