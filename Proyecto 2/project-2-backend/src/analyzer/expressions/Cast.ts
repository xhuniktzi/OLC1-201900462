import { IExpression } from "../abstract/IExpression";
import { IReturnEval } from "../abstract/IReturnEval";
import { Datatype } from "../enums/EnumDatatype";
import { SymbolTable } from "../sym_table/SymbolTable";

export class Cast implements IExpression {
  constructor(private type: Datatype, private value: IExpression) {}
  evaluate(sym_table: SymbolTable): IReturnEval {
    throw new Error("Method not implemented.");
  }
}
