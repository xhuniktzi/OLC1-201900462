import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { SymbolTable } from "../sym_table/SymbolTable";

export class AccessArray implements IExpression {
  constructor(private id: string, private index: IExpression) {}
  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    const eval_value = this.index.evaluate(sym_table);
    if (eval_value!.value < 0) {
      throw new Error("Index out of bounds");
    } else {
      const result = sym_table.getArraySymbol(
        this.id,
        Number(eval_value!.value)
      );

      return {
        value: result.value,
        type: result.datatype,
      };
    }
  }
}
