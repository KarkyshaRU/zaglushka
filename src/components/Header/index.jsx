import React from "react";
import s from "./Heade.module.scss";
import Logo from "../Logo";

const Header = () => {
  return (
    <div className={s.header}>
      <Logo />
    </div>
  );
};

export default Header;
