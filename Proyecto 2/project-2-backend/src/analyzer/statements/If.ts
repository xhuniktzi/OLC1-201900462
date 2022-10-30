import { IExpression } from "../abstract/IExpression";
import { IStatement } from "../abstract/IStatement";
import { Datatype } from "../enums/EnumDatatype";
import { SemanticErrorEx } from "../exceptions/SemanticErrorEx";
import { SymbolTable } from "../sym_table/SymbolTable";
import { Elif } from "./Elif";

export class If implements IStatement {
  constructor(
    private condition: IExpression,
    private if_body: IStatement[],
    private elifs: Elif[] | undefined = undefined,
    private else_body: IStatement[] | undefined = undefined,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.line}${this.column}[label="If"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}1;`;
    str += `node${this.line}${
      this.column
    }1[label="${this.condition.graph()}"];`;
    str += `node${this.line}${this.column} -> node${this.line}${this.column}2;`;
    str += `node${this.line}${this.column}2[label="If Body"];`;
    this.if_body.forEach((statement, i) => {
      str += `node${this.line}${this.column}2 -> node${this.line}${this.column}2${i};`;
      str += `node${this.line}${this.column}2${i}[label="Statement"];`;
      str += statement.graph();
    });
    if (this.elifs !== undefined) {
      str += `node${this.line}${this.column} -> node${this.line}${this.column}3;`;
      str += `node${this.line}${this.column}3[label="Elifs"];`;
      this.elifs.forEach((elif, i) => {
        str += `node${this.line}${this.column}3 -> node${this.line}${this.column}3${i};`;
        str += `node${this.line}${this.column}3${i}[label="Elif"];`;
        str += elif.graph();
      });
    }
    if (this.else_body !== undefined) {
      str += `node${this.line}${this.column} -> node${this.line}${this.column}4;`;
      str += `node${this.line}${this.column}4[label="Else Body"];`;
      this.else_body.forEach((statement, i) => {
        str += `node${this.line}${this.column}4 -> node${this.line}${this.column}4${i};`;
        str += `node${this.line}${this.column}4${i}[label="Statement"];`;
        str += statement.graph();
      });
    }
    return str;
  }

  execute(sym_table: SymbolTable): void {
    const eval_value = this.condition.evaluate(sym_table);
    if (eval_value!.type !== Datatype.BOOLEAN) {
      throw new SemanticErrorEx(
        "Condition must be boolean",
        this.line,
        this.column
      );
    }

    if (Boolean(eval_value!.value)) {
      const if_table: SymbolTable = new SymbolTable(sym_table, "if");
      this.if_body.forEach((statement) => {
        statement.execute(if_table);
      });
      return;
    }
    if (this.elifs !== undefined) {
      for (const elif of this.elifs) {
        const conditional = elif.condition.evaluate(sym_table);
        if (conditional!.type !== Datatype.BOOLEAN) {
          throw new SemanticErrorEx(
            "Condition must be boolean",
            this.line,
            this.column
          );
        }

        if (Boolean(conditional!.value)) {
          const elif_table: SymbolTable = new SymbolTable(sym_table, "elif");
          elif.execute(elif_table);
          return;
        }
      }
    }

    if (!Boolean(eval_value!.value)) {
      if (this.else_body !== undefined) {
        const else_table: SymbolTable = new SymbolTable(sym_table, "else");
        this.else_body.forEach((statement) => {
          statement.execute(else_table);
        });
        return;
      }
    }
  }
}
