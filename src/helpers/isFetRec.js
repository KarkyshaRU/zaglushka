const isFitRec = (services, activeServices) => {
  let isCorrect = true;
  activeServices.forEach(({ title }) => {
    if (services.indexOf(title) === -1) {
      isCorrect = false;
    }
  });
  return isCorrect;
};

export default isFitRec;
