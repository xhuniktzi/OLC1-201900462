import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { IStatement } from "../abstract/IStatement";
import { ReturnEx } from "../exceptions/ReturnEx";
import { SemanticErrorEx } from "../exceptions/SemanticErrorEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Call implements IExpression, IStatement {
  constructor(
    private id: string,
    private args: IExpression[] | undefined,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = "node" + this.line + this.column + '[label="Call"];\n';
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

    try {
      const func_table = new SymbolTable(sym_table, "call function " + this.id);
      if (this.args !== undefined) {
        func!.params!.forEach((param, i) => {
          func_table.addSymbol({
            id: param.id,
            value: this.args![i].evaluate(func_table)!.value,
            column: 0,
            line: 0,
            datatype: param.datatype,
          });
        });
      } else {
        throw new SemanticErrorEx(
          "The function " +
            this.id +
            " requires " +
            func!.params!.length +
            " parameters",
          this.line,
          this.column
        );
      }
      func!.body.forEach((statement) => {
        statement.execute(func_table);
      });
    } catch (error: unknown) {
      if (error instanceof ReturnEx) {
        const eval_value = error.value;
        if (eval_value.type !== func!.datatype) {
          throw new SemanticErrorEx(
            "The function " +
              this.id +
              " returns " +
              func!.datatype +
              " but the return value is " +
              eval_value.type,
            this.line,
            this.column
          );
        }
      } else {
        throw error;
      }
    }
  }

  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const func = sym_table.getFunction(this.id);

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

    try {
      const func_table = new SymbolTable(sym_table, "call function " + this.id);
      if (this.args !== undefined) {
        func!.params!.forEach((param, i) => {
          func_table.addSymbol({
            id: param.id,
            value: this.args![i].evaluate(func_table)!.value,
            column: 0,
            line: 0,
            datatype: param.datatype,
          });
        });
      } else {
        throw new SemanticErrorEx(
          "The function " +
            this.id +
            " requires " +
            func!.params!.length +
            " parameters",
          this.line,
          this.column
        );
      }
      func!.body.forEach((statement) => {
        statement.execute(func_table);
      });
    } catch (error: unknown) {
      if (error instanceof ReturnEx) {
        const eval_value = error.value;
        if (eval_value.type !== func!.datatype) {
          throw new SemanticErrorEx(
            "The function " +
              this.id +
              " returns " +
              func!.datatype +
              " but the return value is " +
              eval_value.type,
            this.line,
            this.column
          );
        } else {
          return eval_value;
        }
      } else {
        throw error;
      }
    }
  }
}
