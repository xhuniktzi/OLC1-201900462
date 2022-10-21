import { TsLanguageParser } from "../analyzer/ts-parser";
import { Request, Response } from "express";
import { IStatement } from "../analyzer/abstract/IStatement";
import { SymbolTable } from "../analyzer/sym_table/SymbolTable";
import { Method } from "../analyzer/statements/Method";
import { FunctionDef } from "../analyzer/statements/FunctionDef";

const parser = (req: Request, res: Response) => {
  const parser = new TsLanguageParser();
  const { text } = req.body;
  try {
    const ast: IStatement[] = parser.parse(text);
    const table = new SymbolTable(undefined);

    ast.forEach((statement) => {
      if (statement instanceof Method) statement.execute(table);
      else if (statement instanceof FunctionDef) statement.execute(table);
    });

    ast.forEach((statement) => {
      statement.execute(table);
    });

    table.printConsole();
  } catch (error: unknown) {
    console.error(error);
  }

  res.status(204).send();
};

export default parser;
