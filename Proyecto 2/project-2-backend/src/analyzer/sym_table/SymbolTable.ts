import { ICallable } from "../abstract/ICallable";
import { ISymArray } from "../abstract/ISymArray";
import { ISymMatrix } from "../abstract/ISymMatrix";
import { Datatype } from "../enums/EnumDatatype";
import fnParseArrayTypes from "../functions/fnParseArrayTypes";
import fnParseMatrixTypes from "../functions/fnParseMatrixTypes";

import { ISymbol } from "./ISymbol";

export class SymbolTable {
  private symbols: ISymbol[] = [];
  private console: string[] = [];
  private functions: ICallable[] = [];
  private arrays: ISymArray[] = [];
  private matrixes: ISymMatrix[] = [];

  public constructor(
    private parent: SymbolTable | undefined,
    private env: string
  ) {
    console.log("[DEBUG]\t", `Creating Symbol Table: ${env}`);
  }

  private debugTable(): void {
    console.log("[DEBUG]\t", "Symbol Table:");
    console.log("[TABLE]\t");
    this.symbols.forEach((symbol) => {
      console.log("[TABLE]\t", symbol.id, symbol.value);
    });
  }

  private debugFunctions(): void {
    console.log("[DEBUG]\t", "Functions:");
    console.log("[FUNCTIONS]\t");
    this.functions.forEach((func) => {
      console.log("[FUNCTIONS]\t", func.id);
    });
  }

  private debugArrays(): void {
    console.log("[DEBUG]\t", "Arrays:");
    console.log("[ARRAYS]\t");
    this.arrays.forEach((array) => {
      console.log("[ARRAYS]\t", array.id);
    });
  }

  private debugMatrixes(): void {
    console.log("[DEBUG]\t", "Matrixes:");
    console.log("[MATRIXES]\t");
    this.matrixes.forEach((matrix) => {
      console.log("[MATRIXES]\t", matrix.id);
    });
  }

  public addSymbol(symbol: ISymbol): void {
    console.log("[DEBUG]\t", `Adding symbol ${symbol.id} = ${symbol.value}`);
    this.debugTable();
    if (this.symbols.find((s) => s.id === symbol.id) !== undefined) {
      throw new Error(`Symbol ${symbol.id} already exists`);
    } else {
      this.symbols.push(symbol);
    }
    console.log("[DEBUG]\t", `Symbol ${symbol.id} added`);
    this.debugTable();
  }

  public getSymbol(id: string): ISymbol | undefined {
    const result = this.symbols.find((symbol) => symbol.id === id);

    if (result === undefined && this.parent !== undefined) {
      return this.parent.getSymbol(id);
    } else if (result === undefined) {
      throw new Error(`Symbol ${id} not found`);
    } else {
      return result;
    }
  }

  public updateSymbol(id: string, value: string | boolean | number): void {
    console.log("[DEBUG]\t", `Updating symbol ${id} = ${value}`);
    this.debugTable();
    const symbol = this.getSymbol(id);

    if (symbol) {
      symbol.value = value;
    } else {
      throw new Error(`Symbol ${id} not found`);
    }
    console.log("[DEBUG]\t", `Symbol ${id} updated`);
    this.debugTable();
  }

  public addConsole(text: string): void {
    if (this.parent === undefined) {
      this.console.push(text);
    } else {
      this.parent.addConsole(text);
    }
  }

  public printConsole(): string {
    let result = "";
    this.console.forEach((text) => {
      console.log("[CONSOLE]\t", text);
      result += text;
    });

    return result;
  }

  public addFunction(func: ICallable): void {
    console.log("[DEBUG]\t", `Adding function ${func.id}`);
    this.debugFunctions();
    if (this.parent === undefined) {
      this.functions.push(func);
    } else {
      this.parent.addFunction(func);
    }
  }

  public getFunction(id: string): ICallable {
    if (this.parent === undefined) {
      return this.functions.find((func) => func.id === id)!;
    } else {
      return this.parent.getFunction(id);
    }
  }

  public getArraySymbol(id: string, pos: number): ISymbol {
    return this.getArray(id).value[pos];
  }

  public createArray(id: string, size: number, datatype: Datatype): void {
    console.log("[DEBUG]\t", `Creating array ${id}`);
    this.debugArrays();

    let val;

    switch (datatype) {
      case Datatype.CHAR:
      case Datatype.STRING:
        val = "";
        break;
      case Datatype.DOUBLE:
      case Datatype.INT:
        val = 0;
        break;
      case Datatype.BOOLEAN:
        val = false;
        break;
    }

    this.arrays.push({
      id,
      size,
      value: new Array(size).fill(val),
      type: fnParseArrayTypes(datatype),
    });
    console.log("[DEBUG]\t", `Array ${id} created`);
    this.debugArrays();
  }

  private getArray(id: string): ISymArray {
    if (this.parent === undefined) {
      return this.arrays.find((array) => array.id === id)!;
    } else {
      return this.parent.getArray(id);
    }
  }

  public updateArraySymbol(
    id: string,
    pos: number,
    value: string | number | boolean
  ): void {
    const current: ISymbol = this.getArray(id).value[pos];
    current.value = value;
  }

  private getMatrix(id: string): ISymMatrix {
    if (this.parent === undefined) {
      return this.matrixes.find((matrix) => matrix.id === id)!;
    } else {
      return this.parent.getMatrix(id);
    }
  }

  public getMatrixSymbol(id: string, row: number, col: number): ISymbol {
    return this.getMatrix(id).value[row][col];
  }

  public createMatrix(
    id: string,
    rows: number,
    cols: number,
    datatype: Datatype
  ): void {
    console.log("[DEBUG]\t", `Creating matrix ${id}`);
    this.debugMatrixes();
    let val;

    switch (datatype) {
      case Datatype.CHAR:
      case Datatype.STRING:
        val = "";
        break;
      case Datatype.DOUBLE:
      case Datatype.INT:
        val = 0;
        break;
      case Datatype.BOOLEAN:
        val = false;
        break;
    }

    this.matrixes.push({
      id,
      rows,
      columns: cols,
      value: new Array(rows).fill(new Array(cols).fill(val)),
      type: fnParseMatrixTypes(datatype),
    });
    console.log("[DEBUG]\t", `Matrix ${id} created`);
    this.debugMatrixes();
  }

  public updateMatrixSymbol(
    id: string,
    row: number,
    col: number,
    value: string | number | boolean
  ): void {
    const current: ISymbol = this.getMatrix(id).value[row][col];
    current.value = value;
  }
}
