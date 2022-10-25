import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { SymbolTable } from "../sym_table/SymbolTable";

export class AccessMatrix implements IExpression {
  constructor(
    private id: string,
    private row: IExpression,
    private col: IExpression
  ) {}
  evaluate(sym_table: SymbolTable): IReturnEval | undefined {
    if (this.row.evaluate(sym_table)!.value < 0) {
      throw new Error("Index out of bounds");
    } else {
      const result = sym_table.getMatrixSymbol(
        this.id,
        Number(this.row.evaluate(sym_table)!.value),
        Number(this.col.evaluate(sym_table)!.value)
      );

      return {
        value: result.value,
        type: result.datatype,
      };
    }
  }
}
