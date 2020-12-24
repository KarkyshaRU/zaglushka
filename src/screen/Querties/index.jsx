import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getQuery } from "../../redux/reducer";

// components
import Avatar from "../../helpers/Avatar";

// Styles
import s from "./Querties.module.scss";
import formatDataFeedback from "../../helpers/formatDataFeedback";
import formatFullNameFeedback from "../../helpers/formatFullNameFeedback copy";
import parseQueryStatus from "../../helpers/parseQueryStatus";

const QuertyItem = ({ avatar, fullName, date, progress, userId, id }) => {
  debugger;

  return (
    <div className={s.quertyItem}>
      <div className={s.withAva}>
        {/* <div className={s.avatar}></div> */}

        <Avatar src={avatar} size={45} />

        <div className={s.info}>
          <div className={s.rate}>
            <NavLink to={"/profile/" + userId} className={s.name}>
              {formatFullNameFeedback(fullName)}
            </NavLink>
            <div className={s.date}>
              {formatDataFeedback(date.seconds * 1000)}
            </div>
          </div>
        </div>
      </div>
      <div className={s.text}>{parseQueryStatus(progress)}</div>
      <div className={s.btn}>
        <NavLink to={"/querties/" + id}>Открыть</NavLink>
      </div>
    </div>
  );
};

const findUserById = (users, id) => {
  let r = users.filter((u) => u.id === id);
  return r.lenght !== 0 ? r[0] : "Not found";
};

function Querties({ querties, credUser, users, getQuery }) {
  if (!credUser.id) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className={s.feedback}>
        <div className={s.head}>
          <div className={s.title}>Запросы</div>
        </div>

        <div className={s.feedbacks}>
          {querties.map((querty) => {
            let id =
              credUser.id === querty.author1 ? querty.author2 : querty.author1;
            let user = findUserById(users, id);
            let { avatar, fullName } = user.info;

            return (
              <QuertyItem
                {...querty}
                avatar={avatar}
                userId={id}
                fullName={fullName}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({
    credUser: state.credUser,
    querties: state.querties,
    users: state.users,
  }),
  {
    getQuery,
  }
)(Querties);
