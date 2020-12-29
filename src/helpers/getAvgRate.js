const getAvgRate = (rate) => {
  if (rate) {
    let s = rate.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    return Math.round(s / rate.length);
  } else {
    return 0;
  }
};

export default getAvgRate;
