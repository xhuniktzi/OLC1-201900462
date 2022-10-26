import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Run implements IStatement {
  constructor(private id: string, private args: IExpression[] | undefined) {}

  execute(sym_table: SymbolTable): void {
    const func = sym_table.getFunction(this.id);
    if (this.args !== undefined) {
      if (func === undefined) {
        throw new Error(`Function ${this.id} not found`);
      } else if (func.params!.length !== this.args!.length) {
        throw new Error(
          `Function ${this.id} expects ${func.params!.length} arguments`
        );
      }
      this.args.forEach((arg, i) => {
        const param = arg.evaluate(sym_table);
        if (param!.type !== func!.params![i].datatype) {
          throw new Error(
            "Semantic error: The function " +
              this.id +
              " expects " +
              func!.params![i].datatype +
              " but the argument " +
              i +
              " is " +
              param!.type
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
