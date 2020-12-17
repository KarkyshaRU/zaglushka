// React
import React from "react";
import { NavLink } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/reducer";

// Components
// -> my
import Header from "../../components/Header";

// Styles
import s from "./Home.module.scss";

// Images
import volunteers from "./../../accets/images/1-1.jpg";
import marker from "../../accets/check.svg";

const ListItem = ({ text }) => {
  return (
    <div className={s.listItem}>
      <div className={s.marker}>
        <img src={marker} alt="маркер" />
      </div>
      <div className={s.itemText}>{text}</div>
    </div>
  );
};

function Home() {
  return (
    <>
      <div className={s.home}>
        <div className={s.text}>
          <div className={s.info}>
            <div className={s.image}>
              <img src={volunteers} alt="Волонтёры" />
            </div>
            <div className={s.more}>
              <div className={s.title}>Добрые руки - это...</div>

              <div className={s.list}>
                <ListItem text="бесплатный сервис," />
                <ListItem text="для пожилых людей, маломобильных граждан, инвалидов," />
                <ListItem
                  text="для волонтёров, медицинских работников и просто
                    неравнодушных,"
                />
                <ListItem
                  text="объединяющий людей, нуждающихся в патронажных услугах, с
                    теми, кто может их оказать."
                />
                <div className={s.footnote}>
                  * – патронажные услуги: проведение медицинских процедур,
                  сопровождение при посещении медицинских учреждений,
                  осуществление гигиенических мероприятий, помощь
                  хозяйственно-бытового характера, контроль за своевременным
                  приемом назначенных лекарств
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.buttonsRL}>
          <div className={s.r}>
            <NavLink to="/login">Войти</NavLink>
          </div>
          <div className={s.l}>
            <NavLink to="/reg">Регистрация</NavLink>
          </div>
        </div>
        <div className={s.buttonMore}>
          <NavLink to="/about">Подробная информация</NavLink>
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => {
    return { credUser: state.credUser };
  },
  {
    logout,
  }
)(Home);
