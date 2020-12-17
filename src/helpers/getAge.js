const getAge = (date) => {
  const y2 = date.split("/")[2];
  const m2 = date.split("/")[1];
  const d2 = date.split("/")[0];

  let birthdate = new Date(`${y2}/${m2}/${d2}`);
  let cur = new Date();
  let diff = cur - birthdate; // This is the difference in milliseconds
  let age = Math.floor(diff / 31557600000);

  return age;
};

export default getAge;
