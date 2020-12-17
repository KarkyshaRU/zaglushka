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
import s from "./AboutUs.module.scss";

function AboutUs({ credUser, logout }) {
  return (
    <>
      <div className={s.aboutUs}>
        <div className={s.title}>
          Побдробнее о сервисе патронажных услуг "Добрые руки"
        </div>

        <div className={s.text}>
          <div className={s.t}>
            <div>
              Давно выяснено, что при оценке дизайна и композиции читаемый текст
              мешает сосредоточиться. Lorem Ipsum используют потому, что тот
              обеспечивает более или менее стандартное заполнение шаблона, а
              также реальное распределение букв и пробелов в абзацах, которое не
              получается при простой дубликации "Здесь ваш текст.. Здесь ваш
              текст..
            </div>
            <div>
              Здесь ваш текст.." Многие программы электронной вёрстки и
              редакторы HTML используют Lorem Ipsum в качестве текста по
              умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу
              показывает, как много веб-страниц всё ещё дожидаются своего
              настоящего рождения. За прошедшие годы текст Lorem Ipsum получил
              много версий. Некоторые версии появились по ошибке, некоторые -
              намеренно (например, юмористические варианты).
            </div>
            <div>
              Здесь ваш текст.." Многие программы электронной вёрстки и
              редакторы
            </div>
          </div>
          <div className={s.t}>
            <div>
              Здесь ваш текст.." Многие программы электронной вёрстки и
              редакторы HTML используют Lorem Ipsum в качестве текста по
              умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу
              показывает, как много веб-страниц всё ещё дожидаются своего
              настоящего рождения. За прошедшие годы текст Lorem Ipsum получил
              много версий. Некоторые версии появились по ошибке, некоторые -
              намеренно (например, юмористические варианты).
            </div>
            <div>
              Давно выяснено, что при оценке дизайна и композиции читаемый текст
              мешает сосредоточиться. Lorem Ipsum используют потому, что тот
              обеспечивает более или менее стандартное заполнение шаблона, а
              также реальное распределение букв и пробелов в абзацах, которое не
              получается при простой дубликации "Здесь ваш текст.. Здесь ваш
              текст..
            </div>
          </div>
        </div>
        <div className={s.buttonMore}>
          <NavLink to="/">На главную</NavLink>
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
)(AboutUs);