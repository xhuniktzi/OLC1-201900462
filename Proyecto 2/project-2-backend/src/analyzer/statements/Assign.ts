import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { SemanticErrorEx } from "../exceptions/SemanticErrorEx";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Assign implements IStatement {
  constructor(
    private ids: string[],
    private value: IExpression | undefined = undefined,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = "node" + this.line + this.column + '[label="Assign"];\n';
    str +=
      "node" +
      this.line +
      this.column +
      " -> node" +
      this.line +
      this.column +
      "1;\n";
    str += "node" + this.line + this.column + '1[label="Ids"];\n';
    this.ids.forEach((id, i) => {
      str +=
        "node" +
        this.line +
        this.column +
        "1 -> node" +
        this.line +
        this.column +
        "1" +
        i +
        ";\n";
      str +=
        "node" + this.line + this.column + "1" + i + '[label="' + id + '"];\n';
    });
    str +=
      "node" +
      this.line +
      this.column +
      " -> node" +
      this.line +
      this.column +
      "2;\n";
    str += "node" + this.line + this.column + '2[label="Value"];\n';
    str += this.value!.graph();
    return str;
  }

  execute(sym_table: SymbolTable): void {
    const eval_value = this.value!.evaluate(sym_table);

    this.ids.forEach((id) => {
      const symbol = sym_table.getSymbol(id);

      if (symbol!.datatype === eval_value!.type) {
        sym_table.updateSymbol(id, eval_value!.value);
      } else {
        throw new SemanticErrorEx("Type mismatch", this.line, this.column);
      }
    });
  }
}
