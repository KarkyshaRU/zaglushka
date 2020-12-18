import React from "react";

import s from "../Profile.module.scss";

import check from "../../../accets/check.svg";
import nocheck from "../../../accets/check.png";

import check_1 from "../../../accets/check_1.svg";
import nocheck_1 from "../../../accets/check_1.png";

const Service = ({ text, isChecked, color, onChecked = () => {} }) => {
  let check_icon = null,
    nocheck_icon = null;

  if (color === 1) {
    check_icon = check_1;
    nocheck_icon = nocheck_1;
  } else {
    check_icon = check;
    nocheck_icon = nocheck;
  }

  return (
    <div className={s.service}>
      <div className={s.marker}>
        {isChecked ? (
          <img src={check_icon} onClick={onChecked} />
        ) : (
          <img src={nocheck_icon} onClick={onChecked} />
        )}
      </div>
      <div className={s.text}>{text}</div>
    </div>
  );
};

export default Service;
