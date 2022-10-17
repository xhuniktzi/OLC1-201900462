import { ISemanticResult } from "../abstract/ISemanticResult";
import { Datatype } from "../enums/EnumDatatype";
import { RelationalOp } from "../enums/EnumRelational";

const fnSemanticCompare = (
  left_type: Datatype,
  right_type: Datatype,
  left_value: string | number | boolean,
  right_value: string | number | boolean,
  operator: RelationalOp
): ISemanticResult => {
  const semanticTable = {
    [Datatype.INT]: {
      [Datatype.INT]: Datatype.BOOLEAN,
      [Datatype.DOUBLE]: Datatype.BOOLEAN,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.DOUBLE]: {
      [Datatype.INT]: Datatype.BOOLEAN,
      [Datatype.DOUBLE]: Datatype.BOOLEAN,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.BOOLEAN]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: Datatype.BOOLEAN,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.CHAR]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: Datatype.BOOLEAN,
      [Datatype.STRING]: Datatype.BOOLEAN,
    },
    [Datatype.STRING]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: Datatype.BOOLEAN,
      [Datatype.STRING]: Datatype.BOOLEAN,
    },
  };

  const type: Datatype = semanticTable[left_type][right_type]!;

  if (type === null) {
    throw new Error("Semantic Error: Cannot compare different types.");
  } else {
    switch (operator) {
      case RelationalOp.EQUAL:
        return {
          value: left_value === right_value,
          type: Datatype.BOOLEAN,
        };
      case RelationalOp.NOT_EQUAL:
        return {
          value: left_value !== right_value,
          type: Datatype.BOOLEAN,
        };
      default:
        throw new Error("Semantic Error: Invalid operator.");
    }
  }
};

export default fnSemanticCompare;
