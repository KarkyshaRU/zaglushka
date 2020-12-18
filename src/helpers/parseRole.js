const parseRole = (role) => {
  switch (role) {
    case 1:
      return "исполнитель";
    case 2:
      return "заказчик";
    case 80:
      return "модератор";
  }
};

export default parseRole;
