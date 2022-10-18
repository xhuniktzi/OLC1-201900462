import { ISemanticResult } from "../abstract/ISemanticResult";
import { Datatype } from "../enums/EnumDatatype";
import { RelationalOp } from "../enums/EnumRelational";

const fnSemanticRelational = (
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
      [Datatype.CHAR]: Datatype.BOOLEAN,
      [Datatype.STRING]: null,
    },
    [Datatype.DOUBLE]: {
      [Datatype.INT]: Datatype.BOOLEAN,
      [Datatype.DOUBLE]: Datatype.BOOLEAN,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: Datatype.BOOLEAN,
      [Datatype.STRING]: null,
    },
    [Datatype.BOOLEAN]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.CHAR]: {
      [Datatype.INT]: Datatype.BOOLEAN,
      [Datatype.DOUBLE]: Datatype.BOOLEAN,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: Datatype.BOOLEAN,
      [Datatype.STRING]: null,
    },
    [Datatype.STRING]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
  };

  const type: Datatype = semanticTable[left_type][right_type]!;

  if (type === null) {
    throw new Error(
      "Semantic Error: Cannot compare two booleans or two chars."
    );
  } else if (type === Datatype.STRING) {
    throw new Error("Semantic Error: Cannot compare two strings.");
  } else {
    switch (operator) {
      case RelationalOp.GREATER_THAN:
        return {
          value: Boolean(left_value > right_value),
          type: Datatype.BOOLEAN,
        };
      case RelationalOp.GREATER_THAN_EQUAL:
        return {
          value: Boolean(left_value >= right_value),
          type: Datatype.BOOLEAN,
        };
      case RelationalOp.LESS_THAN:
        return {
          value: Boolean(left_value < right_value),
          type: Datatype.BOOLEAN,
        };
      case RelationalOp.LESS_THAN_EQUAL:
        return {
          value: Boolean(left_value <= right_value),
          type: Datatype.BOOLEAN,
        };
      default:
        throw new Error("Semantic Error: Invalid relational operator.");
    }
  }
};

export default fnSemanticRelational;
