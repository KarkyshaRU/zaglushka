const parseQueryStatus = (Status) => {
  switch (Status) {
    case "process":
      return "в процессе";
    case "done":
      return "завершен";
    case "wait done":
      return "ожидание завершения";
  }
};

export default parseQueryStatus;
