// React
import React from "react";

// Redux
import { connect } from "react-redux";
import {
  logout,
  changeServicesFilterLine,
  changeServiceStatus,
  changeUsersFilterLine,
} from "../../redux/reducer";

// Components
// -> my
import Empty from "./Empty";
import CardVolunteer from "../../components/CardVolunteer";
import Checkbox from "../../components/Checkbox";

// Styles
import s from "./AllUsers.module.scss";

// Images
import search from "../../accets/search.svg";
import isFitRec from "../../helpers/isFetRec";
import { Redirect } from "react-router";

function AllUsers({
  // filter services
  changeServicesFilterLine,
  changeServiceStatus,
  servicesFilterLine,
  services,
  isLoading,

  // filter users
  changeUsersFilterLine,
  usersFilterLine,

  users,
  credUser,
}) {
  if (!credUser.id) {
    debugger;
    return <Redirect to="/login" />;
  }

  if (credUser.info.role !== 80) {
    return <Redirect to={"/profile/" + credUser.id} />;
  }

  return (
    <>
      <div className={s.AllUsers}>
        <div className={s.filter}>
          <div className={s.searchWrp}>
            <div className={s.search}>
              <input
                type="text"
                placeholder="Поиск услуги"
                value={servicesFilterLine}
                onChange={({ target }) =>
                  changeServicesFilterLine(target.value)
                }
              />
              <img src={search} alt="" />
            </div>
          </div>

          <div className={s.list}>
            {services.map(({ title, id, isActive }) => {
              return (
                <Checkbox
                  text={title}
                  isChecked={isActive}
                  onChange={() => changeServiceStatus(id, !isActive)}
                  color="#fff"
                />
              );
            })}
          </div>
        </div>
        <div className={s.r}>
          <div className={s.search}>
            <input
              type="text"
              placeholder="Поиск по имени"
              value={usersFilterLine}
              onChange={({ target }) => changeUsersFilterLine(target.value)}
            />
            <img src={search} alt="" />
          </div>

          {users.filter(({ info }) => {
            return isFitRec(
              info.services,
              services.filter((s) => s.isActive)
            );
          }).length > 0 &&
          users.filter(({ info }) => {
            return (
              info.fullName
                .toLowerCase()
                .indexOf(usersFilterLine.toLowerCase()) !== -1 ||
              usersFilterLine === ""
            );
          }).length > 0 ? (
            <>
              <div className={s.pag}>
                <div className={s.pag_item}>1</div>
                <div className={s.pag_item}>2</div>
                <div className={s.pag_item}>3</div>
                <div className={s.pag_item}>...</div>
                <div className={s.pag_item}>11</div>
              </div>
              <div className={s.users}>
                {users
                  .filter(({ info }) => {
                    return isFitRec(
                      info.services,
                      services.filter((s) => s.isActive)
                    );
                  })

                  // find by fullName
                  .filter(({ info }) => {
                    let a =
                      info.fullName
                        .toLowerCase()
                        .indexOf(usersFilterLine.toLowerCase()) !== -1;
                    return a || usersFilterLine === "";
                  })
                  .map(({ id, info }) => {
                    return (
                      <CardVolunteer isAdminPanel={true} id={id} info={info} />
                    );
                  })}
              </div>
            </>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => {
    return {
      // loading
      isLoading: state.isLoading,

      // filter
      servicesFilterLine: state.servicesFilterLine,
      services: state.services.filter((s) => {
        let a = s.title
          .toLowerCase()
          .indexOf(state.servicesFilterLine.toLowerCase());
        return a !== -1;
      }),

      credUser: state.credUser,

      usersFilterLine: state.usersFilterLine,
      users:
        state.users.length > 0
          ? state.users
              // .filter((user) => {
              //   return user.info.role === 1;
              // })
              .sort((prev, next) => prev.info.active - next.info.active)
          : [],
    };
  },
  {
    logout,

    // filter services
    changeServicesFilterLine,
    changeServiceStatus,

    // fiter users
    changeUsersFilterLine,
  }
)(AllUsers);
