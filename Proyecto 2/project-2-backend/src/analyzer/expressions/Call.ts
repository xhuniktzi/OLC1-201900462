import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { ReturnEx } from "../exceptions/ReturnEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Call implements IExpression {
  constructor(private id: string, private args: IExpression[] | undefined) {}

  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const func = sym_table.getFunction(this.id);
    try {
      const func_table = new SymbolTable(sym_table);
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
        throw new Error(
          "Semantic error: The function " +
            this.id +
            " requires " +
            func!.params!.length +
            " parameters"
        );
      }
      func!.body.forEach((statement) => {
        statement.execute(func_table);
      });
    } catch (error: unknown) {
      if (error instanceof ReturnEx) {
        const eval_value = error.value;
        return eval_value;
      } else {
        throw error;
      }
    }
  }
}
