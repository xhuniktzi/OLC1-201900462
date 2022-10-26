import { errors, TsLanguageParser } from "../analyzer/ts-parser";
import { Request, Response } from "express";
import { IStatement } from "../analyzer/abstract/IStatement";
import { SymbolTable } from "../analyzer/sym_table/SymbolTable";
import { Method } from "../analyzer/statements/Method";
import { FunctionDef } from "../analyzer/statements/FunctionDef";
import { SemanticErrorEx } from "../analyzer/exceptions/SemanticErrorEx";

const parser = (req: Request, res: Response) => {
  const parser = new TsLanguageParser();
  const { text } = req.body;
  try {
    const ast: IStatement[] = parser.parse(text);
    errors.forEach((error) => {
      console.log(error);
    });
    const table = new SymbolTable(undefined, "global");

    ast.forEach((statement) => {
      if (statement instanceof Method) statement.execute(table);
      else if (statement instanceof FunctionDef) statement.execute(table);
    });

    ast.forEach((statement) => {
      if (!(statement instanceof Method) && !(statement instanceof FunctionDef))
        statement.execute(table);
    });

    const cout = table.printConsole();
    res.send({
      cout,
    });
  } catch (error: unknown) {
    if (error instanceof SemanticErrorEx) {
      res.send({
        cout: error.message,
      });
      return;
    }
    console.error(error);
    res.send(500);
  }
};

export default parser;
