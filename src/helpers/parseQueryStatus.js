const parseQueryStatus = (Status) => {
  debugger;
  switch (Status) {
    case "wait comfirm":
      return "ожидание ответа";
    case "process":
      return "в процессе";
    case "done":
      return "завершен";
    case "wait done":
      return "ожидание завершения";
    case "cancel":
      return "отменён";
  }
};

export default parseQueryStatus;
