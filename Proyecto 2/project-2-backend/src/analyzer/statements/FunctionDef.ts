import { ICallable } from "../abstract/ICallable";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { IParam } from "../abstract/IParam";
import { SymbolTable } from "../sym_table/SymbolTable";
import { Guid } from "typescript-guid";

export class FunctionDef implements ICallable {
  constructor(
    public id: string,
    public params: IParam[] | undefined,
    public datatype: Datatype,
    public body: IStatement[],
    public line: number,
    public column: number
  ) {}

  uuid: Guid = Guid.create(); // Unique identifier
  graph(): string {
    let str: string = `node${this.uuid} [label="FunctionDef"];\n`;
    str += `node${this.uuid} -> node${this.id};\n`;
    this.body.forEach((statement) => {
      str += `node${this.uuid} -> node${statement.uuid};\n`;
      str += statement.graph();
    });
    return str;
  }

  execute(sym_table: SymbolTable): void {
    sym_table.addFunction(this);
  }
}
