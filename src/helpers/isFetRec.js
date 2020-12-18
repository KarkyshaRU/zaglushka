const isFitRec = (services, activeServices) => {
  const titles = services
    .filter(({ isActive }) => isActive)
    .map(({ title }) => title);

  let isCorrect = true;
  activeServices.forEach(({ title, ...r }) => {
    if (titles.indexOf(title) === -1) {
      isCorrect = false;
    }
  });
  return isCorrect;
};

export default isFitRec;
