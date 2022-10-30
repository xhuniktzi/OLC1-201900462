import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { SemanticErrorEx } from "../exceptions/SemanticErrorEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Run implements IStatement {
  constructor(
    private id: string,
    private args: IExpression[] | undefined,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = "node" + this.line + this.column + '[label="Run"];\n';
    str +=
      "node" +
      this.line +
      this.column +
      " -> node" +
      this.line +
      this.column +
      "1;\n";
    str += "node" + this.line + this.column + '1[label="' + this.id + '"];\n';
    if (this.args !== undefined) {
      str +=
        "node" +
        this.line +
        this.column +
        " -> node" +
        this.line +
        this.column +
        "2;\n";
      str += "node" + this.line + this.column + '2[label="Args"];\n';
      this.args.forEach((arg, i) => {
        str +=
          "node" +
          this.line +
          this.column +
          "2 -> node" +
          this.line +
          this.column +
          "2" +
          i +
          ";\n";
        str += "node" + this.line + this.column + "2" + i + '[label="Arg"];\n';
        str += arg.graph();
      });
    } else {
      str +=
        "node" +
        this.line +
        this.column +
        " -> node" +
        this.line +
        this.column +
        "2;\n";
      str += "node" + this.line + this.column + '2[label="Args"];\n';
    }
    return str;
  }

  execute(sym_table: SymbolTable): void {
    const func = sym_table.getFunction(this.id);
    if (this.args !== undefined) {
      if (func === undefined) {
        throw new SemanticErrorEx(
          `Function ${this.id} not found`,
          this.line,
          this.column
        );
      } else if (func.params!.length !== this.args!.length) {
        throw new SemanticErrorEx(
          `Function ${this.id} expects ${func.params!.length} arguments`,
          this.line,
          this.column
        );
      }
      this.args.forEach((arg, i) => {
        const param = arg.evaluate(sym_table);
        if (param!.type !== func!.params![i].datatype) {
          throw new SemanticErrorEx(
            "The function " +
              this.id +
              " expects " +
              func!.params![i].datatype +
              " but the argument " +
              i +
              " is " +
              param!.type,
            this.line,
            this.column
          );
        }

        sym_table.addSymbol({
          id: func!.params![i].id,
          value: param!.value,
          column: 0,
          line: 0,
          datatype: param!.type,
        });
      });
    }
    func!.body.forEach((statement) => {
      statement.execute(sym_table);
    });
  }
}
