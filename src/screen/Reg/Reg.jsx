import React, { useState } from "react";

import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import Header from "../../components/Header";
import {
  addUser,
  checkUnicEmail,
  logout,
  loginCache,
  addErrorReg,
  clearErrorsReg,
  changeRegFormData,
} from "../../redux/reducer";
import s from "./Reg.module.scss";

import Uploader from "../../components/Uploader";

function Login({
  addUser,
  credUser,
  loginCache,
  errors,

  regForm,

  changeRegFormData,
}) {
  const {
    fullName,
    email,
    location,
    birthday,
    pass,
    repeatPass,
    images,
    block,
    role,
  } = regForm;

  const setFullName = (e) => {
    changeRegFormData("fullName", e);
  };

  const setEmail = (e) => {
    changeRegFormData("email", e);
  };

  const setLocation = (e) => {
    changeRegFormData("location", e);
  };

  const setBirthday = (e) => {
    changeRegFormData("birthday", e);
  };

  const setPass = (e) => {
    changeRegFormData("pass", e);
  };

  const setRepeatPass = (e) => {
    changeRegFormData("repeatPass", e);
  };

  const setImages = (e) => {
    changeRegFormData("images", e);
  };

  const setBlock = (e) => {
    changeRegFormData("block", e);
  };

  const setRole = (e) => {
    changeRegFormData("role", e);
  };

  // const [role, setRole] = useState(1);

  const onReg = () => {
    const userInfo = {
      fullName,
      email,
      location,
      birthday,
      services: [],
      docs: images,
      pass,
      role,
      active: 0,
      avatar: null,
    };

    addUser(userInfo);
  };

  if (credUser.id) {
    if (!loginCache()) {
      return <Redirect to={`/profile/${credUser.id}`} />;
    } else {
      return <Redirect to={`/login`} />;
    }
  }

  return (
    <>
      {block && (
        <div className={s.block}>
          {errors.length ? (
            <div className={s.errors}>
              <div className={s.title}>Сбой</div>

              {errors.map((err) => (
                <div className={s.err}>{err}</div>
              ))}

              <div className={s.one}>
                <button className={s.btn} onClick={() => setBlock(false)}>
                  Вернутся назад
                </button>
              </div>
            </div>
          ) : (
            <div className={s.success}>
              <div className={s.title}>Успешная регистрация</div>
              <div className={s.text}>
                Регистрация прошла успешно:{" "}
                <NavLink to={"/login"} className={s.go}>
                  войти в аккаунт
                </NavLink>
              </div>

              <div className={s.one}>
                <button className={s.btn} onClick={() => setBlock(false)}>
                  Вернутся назад
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={s.login}>
        <div className={s.title}>Регистрация</div>

        <div className={s.head}>
          <div className={s.discription}>
            {role === 1 ? (
              <>
                Если Вы хотите и можете оказывать патронажные услуги,
                пожалуйста, заполните данную форму. Также просим Вас загрузить
                документы, подтверждающие Вашу квалификацию и компетенции.
              </>
            ) : (
              <>
                Если Вы нуждаетесь в получении патронажных услуг, либо желаете
                заказать их для своих близких, пожалуйста, заполните данную
                форму.
              </>
            )}
          </div>
          <div className={s.toggle}>
            <div
              className={`${s.var} ${role === 1 ? s.active : s.noactive}`}
              onClick={() => {
                setRole(1);
              }}
            >
              Исполнитель
            </div>
            <div
              className={`${s.var} ${role === 2 ? s.active : s.noactive}`}
              onClick={() => {
                setRole(2);
              }}
            >
              Заказчик
            </div>
          </div>
        </div>

        <div className={`${s.wrp} ${role === 1 ? s.two : s.one}`}>
          <div className={s.form}>
            <input
              type="text"
              className={s.password}
              placeholder="ФИО"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              className={s.mail}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className={s.password}
              placeholder="Местоположение (Россия, г.Пермь)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              type="text"
              className={s.password}
              placeholder="Дата рождения (01/01/2000)"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />

            <input
              type="password"
              className={s.password}
              placeholder="Пароль"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <input
              type="password"
              className={s.password}
              placeholder="Повторите пароль"
              value={repeatPass}
              onChange={(e) => setRepeatPass(e.target.value)}
            />
          </div>

          <div
            className={s.docs}
            style={{ display: role === 1 ? "block" : "none" }}
          >
            <Uploader images={images} setImages={setImages} />
          </div>
        </div>

        <div className={s.btns}>
          <div className={s.btn} onClick={onReg}>
            Зарегистрироваться
          </div>
          <NavLink to="/login" className={s.create}>
            Уже есть аккаунт
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({
    regForm: state.regForm,
    credUser: state.credUser,
    errors: state.errors.reg,
  }),
  {
    addUser,
    checkUnicEmail,
    logout,
    loginCache,
    addErrorReg,
    clearErrorsReg,
    changeRegFormData,
  }
)(Login);
