import React from "react";

import s from "./Logo.module.scss";

import hands from "../../accets/hands.svg";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink className={s.logo} to="/">
      <div className={s.svg}>
        <img src={hands} alt="" />
      </div>
      <div className={s.text}>
        <div className={s.title}>Добрые руки</div>
        <div className={s.subtitle}>Сервис патронажных услуг</div>
      </div>
    </NavLink>
  );
};

export default Logo;
