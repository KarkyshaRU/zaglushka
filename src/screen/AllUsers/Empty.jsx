import React from "react";

import s from "./AllUsers.module.scss";

import box from "../../accets/box.svg";

const Empty = () => {
  return (
    <div className={s.empty}>
      <div className={s.block}>
        <div className={s.titlee}>Исполнители не найденый</div>
        <div className={s.imge}>
          <img src={box} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Empty;
