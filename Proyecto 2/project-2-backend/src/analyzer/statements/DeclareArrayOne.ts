import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class DeclareArrayOne implements IStatement {
  constructor(
    private datatype: Datatype,
    private id: string,
    private size: IExpression | undefined,
    private list_expr: IExpression[] | undefined,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.id}${this.line}${this.column}[label="DeclareArrayOne"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}1;`;
    str += `node${this.id}${this.line}${this.column}1[label="${this.datatype}"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}2;`;
    str += `node${this.id}${this.line}${this.column}2[label="${this.id}"];`;
    if (this.list_expr !== undefined) {
      str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}3;`;
      str += `node${this.id}${this.line}${this.column}3[label="ListExpr"];`;
      this.list_expr.forEach((expr, i) => {
        str += `node${this.id}${this.line}${this.column}3 -> node${this.id}${this.line}${this.column}3${i};`;
        str += `node${this.id}${this.line}${this.column}3${i}[label="Expr"];`;
        str += expr.graph();
      });
    } else if (this.size !== undefined) {
      str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}3;`;
      str += `node${this.id}${this.line}${this.column}3[label="Size"];`;
      str += this.size.graph();
    } else {
      str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}3;`;
      str += `node${this.id}${this.line}${this.column}3[label="Size"];`;
    }
    return str;
  }

  execute(sym_table: SymbolTable): void {
    if (this.list_expr !== undefined) {
      const size = this.list_expr.length;
      sym_table.createArray(
        this.id,
        size,
        this.datatype,
        this.line,
        this.column
      );
      this.list_expr.forEach((expr, index) => {
        const val = expr.evaluate(sym_table)!.value;
        sym_table.updateArraySymbol(this.id, index, val);
      });
    } else if (this.size !== undefined) {
      const size = Number(this.size.evaluate(sym_table)!.value);
      sym_table.createArray(
        this.id,
        size,
        this.datatype,
        this.line,
        this.column
      );
    }
  }
}
