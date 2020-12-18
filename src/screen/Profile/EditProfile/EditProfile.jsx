import React, { useState } from "react";

import { connect } from "react-redux";
import {
  isValidateFullName,
  isValidBirthday,
  isValidLocation,
} from "../../../helpers/validate";
import Service from "../Service";

import s from "./EditProfile.module.scss";

import search from "../../../accets/search_1.svg";

const Search = ({ value, onChange }) => {
  return (
    <div className={s.searchWrp}>
      <div className={s.search}>
        <input
          type="text"
          placeholder="Поиск услуги"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <img src={search} alt="" />
      </div>
    </div>
  );
};

function EditProfile({
  fullName = "",
  email = "",
  location = "",
  birthday = "",
  pass = "",
  images = "",
  role = "",
  id = "",
  services,

  onClose = () => {},
  onSave = () => {},
}) {
  debugger;
  const [fullNameN, setFullNameN] = useState(fullName);
  const [servicesN, setServicesN] = useState(services);
  const [filter, setFilter] = useState("");
  const [birthdayN, setBirthdayN] = useState(birthday);
  const [locationN, setLocationN] = useState(location);

  const [errors, setErrors] = useState([]);

  const onChecked = (id, status) => {
    setServicesN(
      servicesN.map((s) => {
        return s.id === id ? { ...s, isActive: status } : s;
      })
    );
  };

  const saveWithVerif = () => {
    setErrors([]);

    let isFullName = isValidateFullName(fullNameN);
    if (!isFullName) {
      setErrors([
        ...errors,
        "Фамилия, имя или отчество невалидно (мин. длинна 2)",
      ]);
    }

    let isLocation = isValidLocation(locationN);

    if (!isLocation) {
      setErrors([...errors, "Невалидное местоположение"]);
    }

    let isBirthday = isValidBirthday(birthdayN);
    if (!isBirthday) {
      setErrors([...errors, "Невалидная дата рождения"]);
    }

    let evenIsValid = isFullName && isLocation && isBirthday;

    let activeServices = servicesN
      .filter((s) => s.isActive)
      .map((s) => s.title);

    if (evenIsValid) {
      onSave(id, {
        fullName: fullNameN,
        location: locationN,
        birthday: birthdayN,
        services: activeServices,
      });
    }
    onClose();
  };

  return (
    <div className={s.editProfile_bg}>
      <div className={s.block}>
        <div className={s.title}>Редактировать профиль</div>

        <div className={s.form}>
          <input
            type="tex"
            className={s.input}
            placeholder="ФИО"
            value={fullNameN}
            onChange={(e) => setFullNameN(e.target.value)}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Местоположение (Россия, г.Лысьва)"
            value={locationN}
            onChange={(e) => setLocationN(e.target.value)}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Дата рождения (01/01/2000)"
            value={birthdayN}
            onChange={(e) => setBirthdayN(e.target.value)}
          />

          {role === 1 && (
            <div className={s.services_wrp}>
              <Search value={filter} onChange={setFilter} />
              <div className={s.services}>
                {servicesN
                  .filter((s) => {
                    let a = s.title.toLowerCase().indexOf(filter.toLowerCase());
                    return a !== -1;
                  })
                  .map((s) => {
                    return (
                      <Service
                        isChecked={s.isActive}
                        text={s.title}
                        color={1}
                        onChecked={() => onChecked(s.id, !s.isActive)}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        <div className={s.btns}>
          <div className={s.btn + " " + s.danger} onClick={onClose}>
            Отмена
          </div>
          <div className={s.btn} onClick={saveWithVerif}>
            Сохранить
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({}), {})(EditProfile);
