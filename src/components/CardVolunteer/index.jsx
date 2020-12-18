import React from "react";
import { NavLink } from "react-router-dom";

// styles
import s from "./CardVolunteer.module.scss";

import getAge from "../../helpers/getAge";
import parseRole from "../../helpers/parseRole";

const CardVolunteer = ({ info, id, isAdminPanel }) => {
  return (
    <div className={s.cardVolunteer}>
      <div className={s.avatar}></div>
      <div className={s.info}>
        {info.fullName} ({getAge(info.birthday)})
      </div>
      {isAdminPanel && (
        <>
          <div className={s.location}>
            Статус: {info.active ? "подтвержденный" : "неподтвержденный"}
          </div>
          <div className={s.location}>Роль: {parseRole(info.role)}</div>
        </>
      )}
      <div className={s.location}>{info.location}</div>
      <div className={s.btn}>
        <NavLink to={`/profile/${id}`}>Профиль</NavLink>
      </div>
    </div>
  );
};

export default CardVolunteer;
