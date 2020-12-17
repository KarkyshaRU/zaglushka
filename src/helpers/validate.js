export const isValidateFullName = (fullName) => {
  return (
    fullName.trim().split(" ").length === 3 &&
    fullName
      .trim()
      .split(" ")
      .filter((n) => n.length >= 2).length === 3
  );
};

export const isValidateEmail = (email) => {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
};

export const isValidLocation = (location) => {
  return (
    /^[а-яё]*$/i.test(
      location.replace(" ", "").replace(".", "").replace(",", "")
    ) && location.length > 0
  );
};

export const isValidBirthday = (birthday) => {
  return (
    birthday.split("/").length === 3 &&
    !isNaN(birthday.split("/")[0]) &&
    birthday.split("/")[0] <= 31 &&
    !isNaN(birthday.split("/")[1]) &&
    birthday.split("/")[1] <= 12 &&
    !isNaN(birthday.split("/")[2]) &&
    birthday.split("/")[2].length === 4 &&
    birthday.split("/")[2] <= 2020 &&
    birthday.split("/")[2] >= 1900
  );
};

export const isValidPass = (pass, repeatPass) => pass === repeatPass;

export const isValidLenghtPass = (pass) => pass.length >= 8;

export const isValidDocs = (role, images) =>
  role === 1 ? images.length > 0 : true;
