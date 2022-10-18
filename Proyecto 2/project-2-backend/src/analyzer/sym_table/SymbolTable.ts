import { ISymbol } from "./ISymbol";

export class SymbolTable {
  public symbols: ISymbol[] = [];
  public console: string[] = [];

  public constructor(private parent: SymbolTable | undefined) {}

  public addSymbol(symbol: ISymbol): void {
    if (this.symbols.find((s) => s.id === symbol.id) !== undefined) {
      throw new Error(`Symbol ${symbol.id} already exists`);
    } else {
      this.symbols.push(symbol);
    }
  }

  public getSymbol(id: string): ISymbol | undefined {
    let result = this.symbols.find((symbol) => symbol.id === id);

    if (result === undefined && this.parent !== undefined) {
      return this.parent.getSymbol(id);
    } else if (result === undefined) {
      throw new Error(`Symbol ${id} not found`);
    } else {
      return result;
    }
  }

  public updateSymbol(id: string, value: string | boolean | number): void {
    const symbol = this.getSymbol(id);

    if (symbol) {
      symbol.value = value;
    } else {
      throw new Error(`Symbol ${id} not found`);
    }
  }
}
