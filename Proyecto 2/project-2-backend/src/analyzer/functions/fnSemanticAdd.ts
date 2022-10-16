import { ISemanticResult } from "../abstract/ISemanticResult";
import { Datatype } from "../enums/EnumDatatype";

const fnSemanticAdd = (
  left_type: Datatype,
  right_type: Datatype,
  left_value: string | number | boolean,
  right_value: string | number | boolean
): ISemanticResult => {
  const semanticTable = {
    [Datatype.INT]: {
      [Datatype.INT]: Datatype.INT,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: Datatype.INT,
      [Datatype.CHAR]: Datatype.INT,
      [Datatype.STRING]: Datatype.STRING,
    },
    [Datatype.DOUBLE]: {
      [Datatype.INT]: Datatype.DOUBLE,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: Datatype.DOUBLE,
      [Datatype.CHAR]: Datatype.DOUBLE,
      [Datatype.STRING]: Datatype.STRING,
    },
    [Datatype.BOOLEAN]: {
      [Datatype.INT]: Datatype.INT,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: Datatype.STRING,
    },
    [Datatype.CHAR]: {
      [Datatype.INT]: Datatype.INT,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: Datatype.STRING,
      [Datatype.STRING]: Datatype.STRING,
    },
    [Datatype.STRING]: {
      [Datatype.INT]: Datatype.STRING,
      [Datatype.DOUBLE]: Datatype.STRING,
      [Datatype.BOOLEAN]: Datatype.STRING,
      [Datatype.CHAR]: Datatype.STRING,
      [Datatype.STRING]: Datatype.STRING,
    },
  };

  const type: Datatype = semanticTable[left_type][right_type]!;
  if (type === null) {
    throw new Error("Semantic Error: Cannot add two booleans or two chars.");
  }
  if (type === Datatype.STRING) {
    return {
      value: `${left_value}${right_value}`,
      type,
    };
  } else {
    return {
      value: Number(left_value) + Number(right_value),
      type,
    };
  }
};

export default fnSemanticAdd;
