const fnParseBoolean = (value: string): boolean => {
  value = value.toLowerCase();
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      throw new Error("Invalid boolean value.");
  }
};

export default fnParseBoolean;
