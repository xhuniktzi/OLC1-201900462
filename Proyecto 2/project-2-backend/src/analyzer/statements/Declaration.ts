import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Declaration implements IStatement {
  constructor(
    public type: Datatype,
    public ids: string[],
    public value: IExpression | undefined = undefined
  ) {}

  execute(sym_table: SymbolTable): void {
    const eval_value = this.value!.evaluate(sym_table);
    if (this.type === eval_value.type) {
      this.ids.forEach((id) => {
        sym_table.addSymbol({
          id,
          datatype: this.type,
          line: 0,
          column: 0,
          value: eval_value.value,
        });
      });
    } else {
      throw new Error("Type mismatch");
    }
  }
}
