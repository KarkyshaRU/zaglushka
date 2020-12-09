import React from "react";

import s from "./Logo.module.scss";

import hands from "../../accets/hands.svg";

const Logo = () => {
  return (
    <div className={s.logo}>
      <div className={s.svg}>
        <img src={hands} alt="" />
      </div>
      <div className={s.text}>
        <div className={s.title}>Добрые руки</div>
        <div className={s.subtitle}>Сервис патронажных услуг</div>
      </div>
    </div>
  );
};

export default Logo;
