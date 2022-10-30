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
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="FunctionDef"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}1;`;
    str += `node${this.line}${this.column}1[label="${this.id}"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}2;`;
    str += `node${this.line}${this.column}2[label="Params"];`;
    this.params?.forEach((param, i) => {
      str += `node${this.line}${this.column}2 -> node${this.line}${this.column}2${i};`;
      str += `node${this.line}${this.column}2${i}[label="Param"];`;
      str += `node${this.line}${this.column}2${i} -> node${this.line}${this.column}2${i}1;`;
      str += `node${this.line}${this.column}2${i}1[label="${param.id}"];`;
      str += `node${this.line}${this.column}2${i} -> node${this.line}${this.column}2${i}2;`;
      str += `node${this.line}${this.column}2${i}2[label="${param.datatype}"];`;
    });
    str += `node${this.line}${this.column} -> node${this.line}${this.column}3;`;
    str += `node${this.line}${this.column}3[label="Datatype"];`;
    str += `node${this.line}${this.column}3 -> node${this.line}${this.column}31;`;
    str += `node${this.line}${this.column}31[label="${this.datatype}"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}4;`;
    str += `node${this.line}${this.column}4[label="Body"];`;
    this.body.forEach((statement, i) => {
      str += `node${this.line}${this.column}4 -> node${this.line}${this.column}4${i};`;
      str += `node${this.line}${this.column}4${i}[label="Statement"];`;
      str += statement.graph();
    });
    return str;
  }

  execute(sym_table: SymbolTable): void {
    sym_table.addFunction(this);
  }
}
