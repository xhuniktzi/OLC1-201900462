import { TsLanguageParser } from "../analyzer/ts-parser";
import { Request, Response } from "express";

const parser = (req: Request, res: Response) => {
  const parser = new TsLanguageParser();
  const { text } = req.body;
  try {
    console.log(JSON.stringify(parser.parse(text)));
  } catch (error) {
    console.error(error);
  }

  res.status(204).send();
};

export default parser;
