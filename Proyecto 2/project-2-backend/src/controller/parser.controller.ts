import { TsLanguageParser } from "../analyzer/ts-parser";
import { Request, Response } from "express";
import { IStatement } from "../analyzer/abstract/IStatement";
import { SymbolTable } from "../analyzer/sym_table/SymbolTable";

const parser = (req: Request, res: Response) => {
  const parser = new TsLanguageParser();
  const { text } = req.body;
  try {
    const ast: IStatement[] = parser.parse(text);
    const table = new SymbolTable(undefined);
    ast.forEach((statement) => {
      if (statement !== undefined) {
        statement.execute(table);
      }
    });
    console.log("--- Sym Table ---");
    console.log(JSON.stringify(table.symbols));
    console.log("--- Console ---");
    table.console.forEach((e) => {
      console.log(e);
    });
  } catch (error: unknown) {
    console.error(error);
  }

  res.status(204).send();
};

export default parser;
