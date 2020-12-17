import React from "react";
import check from "../../accets/check.svg";
import nocheck from "../../accets/check.png";

// styles
import s from "./Checkbox.module.scss";

const Checkbox = ({ isChecked, text, color, onChange }) => {
  return (
    <div
      className={s.service}
      onClick={onChange}
      style={{
        color,
      }}
    >
      <div className={s.marker}>
        {isChecked ? <img src={check} /> : <img src={nocheck} />}
      </div>
      <div className={s.text}>{text}</div>
    </div>
  );
};

export default Checkbox;
