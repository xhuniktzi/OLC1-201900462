import { Guid } from "typescript-guid";
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

  uuid: string = Guid.create().toString().replace(/-/gm, ""); // Unique identifier
  graph(): string {
    let str: string = `node${this.uuid} [label="Call"];\n`;
    str += `node${this.uuid} -> node${this.uuid}id;\n node${this.uuid}id[label="${this.id}"];\n`;
    if (this.args !== undefined) {
      this.args.forEach((arg) => {
        str += `node${this.uuid} -> node${arg.uuid};\n`;
        str += arg.graph();
      });
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
            column: this.column,
            line: this.line,
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
            column: this.column,
            line: this.line,
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
