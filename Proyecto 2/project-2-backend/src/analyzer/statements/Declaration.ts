import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Declaration implements IStatement {
  constructor(
    private type: Datatype,
    private ids: string[],
    private value: IExpression | undefined = undefined
  ) {}

  execute(sym_table: SymbolTable): void {
    let eval_value: IReturnEval | undefined;

    if (this.value) {
      eval_value = this.value.evaluate(sym_table);
    } else {
      switch (this.type) {
        case Datatype.CHAR:
        case Datatype.STRING:
          eval_value = { value: "", type: this.type };
          break;
        case Datatype.DOUBLE:
        case Datatype.INT:
          eval_value = { value: 0, type: this.type };
          break;
        case Datatype.BOOLEAN:
          eval_value = { value: false, type: this.type };
          break;
      }
    }

    if (this.type === eval_value!.type) {
      this.ids.forEach((id) => {
        sym_table.addSymbol({
          id,
          datatype: this.type,
          line: 0,
          column: 0,
          value: eval_value!.value,
        });
      });
    } else {
      throw new Error("Type mismatch");
    }
  }
}
