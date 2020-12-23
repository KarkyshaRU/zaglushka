import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import { loginUser, clearErrorsLogin, saveMessage } from "../../redux/reducer";

import Header from "../../components/Header";
import s from "./Login.module.scss";

function Login({ loginUser, clearErrorsLogin, errors, credUser, saveMessage }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onLogin = () => {
    let userInfo = {
      email,
      pass,
    };
    loginUser(userInfo);
  };

  if (credUser.id) {
    return <Redirect to={`/profile/${credUser.id}`} />;
  }

  return (
    <>
      <div className={s.login}>
        <div className={s.wrp}>
          <div className={s.title}>Вход</div>
          <div className={s.form}>
            <input
              type="text"
              className={s.mail}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                clearErrorsLogin();
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className={s.password}
              placeholder="Пароль"
              value={pass}
              onChange={(e) => {
                clearErrorsLogin();
                setPass(e.target.value);
              }}
            />

            {errors && (
              <div className={s.errors}>
                {errors.map((err) => (
                  <div className={s.err}>{err}</div>
                ))}
              </div>
            )}

            <div className={s.btn} onClick={onLogin}>
              Войти
            </div>
            <NavLink to="/reg" className={s.create}>
              У меня нет аккаунта
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({
    errors: state.errors.login,
    credUser: state.credUser,
  }),
  {
    loginUser,
    clearErrorsLogin,
    saveMessage,
  }
)(Login);
