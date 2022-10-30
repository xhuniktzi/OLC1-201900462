import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { ArithmeticOp } from "../enums/EnumArithmetic";
import fnSemanticAdd from "../functions/fnSemanticAdd";
import fnSemanticDivision from "../functions/fnSemanticDivision";
import fnSemanticMinus from "../functions/fnSemanticMinus";
import fnSemanticModule from "../functions/fnSemanticModule";
import fnSemanticPower from "../functions/fnSemanticPower";
import fnSemanticProduct from "../functions/fnSemanticProduct";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Arithmetic implements IExpression {
  constructor(
    private left: IExpression,
    private operator: ArithmeticOp,
    private right: IExpression,
    public line: number,
    public column: number
  ) {}
  graph(): string {
    let str: string = `node${this.left}${this.line}${this.column}[label="Arithmetic"];`;
    str += `node${this.left}${this.line}${this.column} -> node${this.left}${this.line}${this.column}1;`;
    str += `node${this.left}${this.line}${
      this.column
    }1[label="${this.left.graph()}"];`;
    str += `node${this.left}${this.line}${this.column} -> node${this.left}${this.line}${this.column}2;`;
    str += `node${this.left}${this.line}${this.column}2[label="${this.operator}"];`;
    str += `node${this.left}${this.line}${this.column} -> node${this.left}${this.line}${this.column}3;`;
    str += `node${this.left}${this.line}${
      this.column
    }3[label="${this.right.graph()}"];`;
    return str;
  }

  evaluate(sym_table: SymbolTable): IReturnEval {
    const left = this.left.evaluate(sym_table);
    const right = this.right.evaluate(sym_table);

    switch (this.operator) {
      case ArithmeticOp.ADD:
        return fnSemanticAdd(
          left!.type,
          right!.type,
          left!.value,
          right!.value
        );
      case ArithmeticOp.MINUS:
        return fnSemanticMinus(
          left!.type,
          right!.type,
          left!.value,
          right!.value
        );
      case ArithmeticOp.PRODUCT:
        return fnSemanticProduct(
          left!.type,
          right!.type,
          left!.value,
          right!.value
        );
      case ArithmeticOp.DIVISION:
        return fnSemanticDivision(
          left!.type,
          right!.type,
          left!.value,
          right!.value
        );
      case ArithmeticOp.POWER:
        return fnSemanticPower(
          left!.type,
          right!.type,
          left!.value,
          right!.value
        );
      case ArithmeticOp.MODULE:
        return fnSemanticModule(
          left!.type,
          right!.type,
          left!.value,
          right!.value
        );
    }
  }
}
