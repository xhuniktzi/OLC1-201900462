import { ISymbol } from "./ISymbol";

export class SymbolTable {
  private symbols: ISymbol[] = [];
  parent: SymbolTable | undefined;

  public constructor(parent: SymbolTable | undefined) {
    this.parent = parent;
  }

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
      result = this.parent.getSymbol(id);
    } else if (result === undefined) {
      throw new Error(`Symbol ${id} not found`);
    } else {
      return result;
    }
  }
}
