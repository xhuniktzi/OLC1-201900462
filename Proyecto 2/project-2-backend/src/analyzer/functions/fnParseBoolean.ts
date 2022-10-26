import { SemanticErrorEx } from "../exceptions/SemanticErrorEx";

const fnParseBoolean = (value: string): boolean => {
  value = value.toLowerCase();
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      throw new SemanticErrorEx("Invalid boolean value.", undefined, undefined);
  }
};

export default fnParseBoolean;
