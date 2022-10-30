import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class DeclareArrayTwo implements IStatement {
  constructor(
    private datatype: Datatype,
    private id: string,
    private list_expr: Array<Array<IExpression>> | undefined,
    private row: IExpression | undefined,
    private col: IExpression | undefined,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.id}${this.line}${this.column}[label="DeclareArrayTwo"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}1;`;
    str += `node${this.id}${this.line}${this.column + 1}[label="${
      this.datatype
    }"];`;
    str += `node${this.id}${this.line}${this.column} -> node${this.id}${
      this.line
    }${this.column + 2};`;
    str += `node${this.id}${this.line}${this.column + 2}[label="${this.id}"];`;
    if (this.list_expr !== undefined) {
      str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}3;`;
      str += `node${this.id}${this.line}${this.column}3[label="ListExpr"];`;
      this.list_expr.forEach((expr, i) => {
        str += `node${this.id}${this.line}${this.column}3 -> node${this.id}${this.line}${this.column}3${i};`;
        str += `node${this.id}${this.line}${this.column}3${i}[label="Expr"];`;
        expr.forEach((expr, j) => {
          str += `node${this.id}${this.line}${this.column}3${i} -> node${this.id}${this.line}${this.column}3${i}${j};`;
          str += `node${this.id}${this.line}${this.column}3${i}${j}[label="Expr"];`;
          str += expr.graph();
        });
      });
    } else if (this.row !== undefined && this.col !== undefined) {
      str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}3;`;
      str += `node${this.id}${this.line}${this.column}3[label="Row"];`;
      str += `node${this.id}${this.line}${this.column}3 -> node${this.id}${this.line}${this.column}31;`;
      str += `node${this.id}${this.line}${this.column}31[label="Expr"];`;
      str += this.row.graph();
      str += `node${this.id}${this.line}${this.column}3 -> node${this.id}${this.line}${this.column}32;`;
      str += `node${this.id}${this.line}${this.column}32[label="Col"];`;
      str += `node${this.id}${this.line}${this.column}32 -> node${this.id}${this.line}${this.column}321;`;
      str += `node${this.id}${this.line}${this.column}321[label="Expr"];`;
      str += this.col.graph();
    } else {
      str += `node${this.id}${this.line}${this.column} -> node${this.id}${this.line}${this.column}3;`;
      str += `node${this.id}${this.line}${this.column}3[label="Error"];`;
    }
    return str;
  }

  execute(sym_table: SymbolTable): void {
    if (this.list_expr !== undefined) {
      const row = this.list_expr.length;
      const col = this.list_expr[0].length;
      sym_table.createMatrix(
        this.id,
        row,
        col,
        this.datatype,
        this.line,
        this.column
      );
      this.list_expr.forEach((list, index) => {
        list.forEach((expr, index2) => {
          const val = expr.evaluate(sym_table)!.value;
          sym_table.updateMatrixSymbol(this.id, index, index2, val);
        });
      });
    } else if (this.row !== undefined && this.col !== undefined) {
      const row = Number(this.row.evaluate(sym_table)!.value);
      const col = Number(this.col.evaluate(sym_table)!.value);
      sym_table.createMatrix(
        this.id,
        row,
        col,
        this.datatype,
        this.line,
        this.column
      );
    }
  }
}
