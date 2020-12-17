// React
import React, { useEffect } from "react";

// Reduc
import { connect } from "react-redux";
import { getUser, logout, setAcctiveAccount } from "../../redux/reducer";

import Header from "../../components/Header";
import s from "./Profile.module.scss";

import check from "../../accets/check.svg";
import { Redirect } from "react-router";
import getAge from "../../helpers/getAge";
import PhotoShower from "../../components/PhotoShower";
import Checkbox from "../../components/Checkbox";

const Service = ({ text }) => {
  return (
    <div className={s.service}>
      <div className={s.marker}>
        <img src={check} />
      </div>
      <div className={s.text}>{text}</div>
    </div>
  );
};

function Profile({
  match,
  getUser,
  profile,
  logout,
  credUser,
  setAcctiveAccount,
}) {
  debugger;

  useEffect(() => {
    getUser(match.params.id);
  }, [match.params.id]);

  if (!credUser.id) {
    return <Redirect to="/login" />;
  }

  const onChangeActiveStatus = () => {
    setAcctiveAccount(profile.id, profile.info.active);
  };

  const parseRole = (role) => {
    switch (role) {
      case 1:
        return "исполнитель";
      case 2:
        return "заказчик";
      case 80:
        return "модератор";
    }
  };

  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          <div className={s.name}>
            {profile.info ? profile.info.fullName : "Loading..."}
          </div>
          <div className={s.confirm}>
            {profile.info ? (
              <Checkbox
                isChecked={profile.info.active}
                text="Подтверждённый аккаунт"
                color="#fff"
                onChange={
                  credUser.info.role === 80 && profile.id !== credUser.id
                    ? onChangeActiveStatus
                    : () => {}
                }
              />
            ) : (
              "Loading..."
            )}
          </div>
          <div className={s.avatar}></div>
          <div className={s.more}>
            <div className={s.email}>
              Почта: {profile.info ? profile.info.email : "Loading..."}
            </div>
            <div className={s.location}>
              Местоположение:{" "}
              {profile.info ? profile.info.location : "Loading..."}
            </div>
            <div className={s.birthday}>
              Дата рождения:{" "}
              {profile.info ? profile.info.birthday : "Loading..."} (
              {getAge(profile.info ? profile.info.birthday : "01/01/1970")})
            </div>
            <div className={s.email}>
              Роль: {profile.info ? parseRole(profile.info.role) : "Loading..."}
            </div>
          </div>
        </div>
        <div className={s.services}>
          <div className={s.title}>Услуги:</div>
          <div className={s.t}>
            {profile.id &&
              profile.info &&
              profile.info.services.map((serv) => {
                return <Service text={serv} />;
              })}
            {profile.info.services.length === 0 && (
              <div className={s.email}>Данные не найдены</div>
            )}
          </div>
        </div>
        <div className={s.docs}>
          {credUser.id && (
            <>
              <div className={s.title}>Документы:</div>

              {profile.info && profile.info.docsURL.length === 0 && (
                <div className={s.empty}>Данные не найдены</div>
              )}
              {profile.info &&
              (credUser.info.role === 80 || credUser.id === profile.id) ? (
                <PhotoShower images={profile.info.docsURL} />
              ) : (
                <div className={s.empty}>
                  У вас нет доступа для просмотра данной информации
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({ profile: state.currentProfile, credUser: state.credUser }),
  {
    getUser,
    setAcctiveAccount,
    logout,
  }
)(Profile);
