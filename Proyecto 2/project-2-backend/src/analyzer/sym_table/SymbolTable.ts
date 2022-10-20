import { ISymbol } from "./ISymbol";

export class SymbolTable {
  private symbols: ISymbol[] = [];
  private console: string[] = [];

  public constructor(private parent: SymbolTable | undefined) {}

  private debugTable(): void {
    console.log("[DEBUG]\t", "Symbol Table:");
    console.log("[TABLE]\t", JSON.stringify(this.symbols));
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
    console.log("[DEBUG]\t", `Getting symbol ${id}`);
    this.debugTable();
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

  public printConsole(): void {
    this.console.forEach((text) => console.log("[CONSOLE]\t", text));
  }
}
