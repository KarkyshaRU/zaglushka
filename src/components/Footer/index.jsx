import React from "react";

import s from "./Footer.module.scss";

const Footer = () => {
  return <div className={s.footer}>© Copyright {new Date().getFullYear()}</div>;
};

export default Footer;
