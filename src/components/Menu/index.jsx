// React
import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import s from "./Menu.module.scss";

const MenuItem = ({ text, path }) => {
  return (
    <li>
      <NavLink to={path} className={s.menuItem} activeClassName={s.active}>
        {text}
      </NavLink>
    </li>
  );
};

const MyMenu = ({ isLogin, isAdmin }) => {
  return (
    <div className={s.menu}>
      <ul>
        {isAdmin && <MenuItem path="/admin/users" text="Все пользователи" />}
        {isAdmin && <MenuItem path="/admin/feedbacks" text="Отзывы" />}

        {!isAdmin && <MenuItem path="/volunteers" text="Перейти к услугам" />}
        {!isAdmin && <MenuItem path="/feedback" text="Обратная связь" />}
        {!isAdmin && isLogin && <MenuItem path="/querties" text="Запросы" />}

        <MenuItem path="/rules" text="Условия пользования сервисом" />
        {!isLogin && <MenuItem path="/login" text="Войти" />}
      </ul>
    </div>
  );
};

export default MyMenu;
