import { IStatement } from "../abstract/IStatement";
import { IParam } from "../abstract/IParam";
import { SymbolTable } from "../sym_table/SymbolTable";
import { ICallable } from "../abstract/ICallable";
import { Datatype } from "../enums/EnumDatatype";

export class Method implements ICallable {
  datatype: Datatype | undefined = undefined;
  constructor(
    public id: string,
    public params: IParam[] | undefined,
    public body: IStatement[]
  ) {}

  execute(sym_table: SymbolTable): void {
    sym_table.addFunction(this);
  }
}
