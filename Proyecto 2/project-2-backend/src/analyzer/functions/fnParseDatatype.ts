import { Datatype } from "../enums/EnumDatatype";

const fnParseDatatype = (datatype: string): Datatype => {
  switch (datatype) {
    case "int":
      return Datatype.INT;
    case "double":
      return Datatype.DOUBLE;
    case "string":
      return Datatype.STRING;
    case "boolean":
      return Datatype.BOOLEAN;
    case "char":
      return Datatype.CHAR;
    default:
      throw new Error(`Datatype ${datatype} not supported`);
  }
};

export default fnParseDatatype;
