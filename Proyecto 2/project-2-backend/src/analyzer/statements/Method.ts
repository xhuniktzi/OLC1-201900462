import { IStatement } from "../abstract/IStatement";
import { IParam } from "../abstract/IParam";
import { SymbolTable } from "../sym_table/SymbolTable";
import { ICallable } from "../abstract/ICallable";

export class Method implements ICallable {
  constructor(
    public id: string,
    public params: IParam[] | undefined,
    public body: IStatement[]
  ) {}

  execute(sym_table: SymbolTable): void {
    sym_table.addFunction(this);
  }
}
