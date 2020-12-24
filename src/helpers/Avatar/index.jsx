import React from "react";
import s from "./Avatar.module.scss";
import placeava from "../../accets/images/placeava.jpg";

const Avatar = ({ src, size, borderColor = "#fff" }) => {
  return (
    <div
      className={s.avatar}
      style={{ width: size, height: size, borderColor }}
    >
      {src ? <img src={src} alt="" /> : <img src={placeava} alt="" />}
    </div>
  );
};

export default Avatar;
