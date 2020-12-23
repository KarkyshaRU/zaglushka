const findUserById = (users, id) => {
  let r = users.filter((u) => u.id === id);
  return r.lenght !== 0 ? r[0] : "Not found";
};

export default findUserById;
