const addZero = (n) => (n < 10 ? "0" + n : n);

let months = [
  "января",
  "февраля",
  " марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "cентября",
  "октября",
  "ноябрь",
  "декабрь",
];

const formatDataFeedback = (sec) => {
  let d = new Date(sec);

  let y = addZero(d.getFullYear());
  let m = d.getMonth();
  let day = addZero(d.getDate());

  let h = addZero(d.getHours());
  let min = addZero(d.getMinutes());

  return `${day} ${months[m]} ${y} в ${h}:${min}`;
};

export default formatDataFeedback;
