import { TsLanguageParser } from "../analyzer/ts-parser";
import { Request, Response } from "express";
import { IStatement } from "../analyzer/abstract/IStatement";
import { SymbolTable } from "../analyzer/sym_table/SymbolTable";
import { Method } from "../analyzer/statements/Method";
import { FunctionDef } from "../analyzer/statements/FunctionDef";
import { SemanticErrorEx } from "../analyzer/exceptions/SemanticErrorEx";
import { LexicalErrorEx } from "../analyzer/exceptions/LexicalErrorEx";
import { SyntaxErrorEx } from "../analyzer/exceptions/SyntaxErrorEx";
import { Global } from "../analyzer/sym_table/Global";

const parser = (req: Request, res: Response) => {
  const parser = new TsLanguageParser();
  parser!.parseError = (_err: any, hash: any) => {
    throw new SyntaxErrorEx(
      `No se esperaba el token: ${hash.token}, Se esperaba: ${hash.expected}`,
      hash.loc.first_line,
      hash.loc.last_column
    );
  };

  const { text } = req.body;
  try {
    const ast: IStatement[] = parser.parse(text);

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
    res.status(200).json({
      cout,
      table: Global.getTable(),
    });
  } catch (error: unknown) {
    if (error instanceof SemanticErrorEx) {
      res.status(200).json({
        cout: error.message,
      });
    } else if (error instanceof LexicalErrorEx) {
      res.status(200).json({
        cout: error.message,
      });
    } else if (error instanceof SyntaxErrorEx) {
      res.status(200).json({
        cout: error.message,
      });
    } else {
      throw error;
    }
  }
};

export default parser;
