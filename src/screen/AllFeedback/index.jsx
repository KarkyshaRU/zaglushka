import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { updateFeedbackStatus } from "../../redux/reducer";

// Styles
import s from "./Feedback.module.scss";

// Images
import star_white from "../../accets/svg/star_white.svg";
import star_outline_white from "../../accets/svg/star_outline_white.svg";

import formatDataFeedback from "../../helpers/formatDataFeedback";
import formatFullNameFeedback from "../../helpers/formatFullNameFeedback copy";
import Checkbox from "../../components/Checkbox";

const FeedbackItem = ({ id, info, updateFeedbackStatus }) => {
  const { text, date, userName, userId, rate, isActive } = info;

  return (
    <div className={s.feedbackItem}>
      <div className={s.avatar}></div>

      <div>
        <div className={s.info}>
          <div className={s.rate}>
            {[0, 0, 0, 0, 0].map((e, idx) => {
              return idx + 1 <= rate ? (
                <img src={star_white} alt="" />
              ) : (
                <img src={star_outline_white} alt="" />
              );
            })}
            <NavLink to={"/profile/" + userId} className={s.name}>
              {formatFullNameFeedback(userName)}
            </NavLink>
            <div className={s.date}>
              {formatDataFeedback(date.seconds * 1000)}
            </div>

            <div className={s.status}>
              <Checkbox
                isChecked={isActive}
                onChange={() => updateFeedbackStatus(id, !isActive)}
                text={isActive ? "Разрешённый" : "Неразрешённый"}
              />
            </div>
          </div>
        </div>
        <div className={s.text}>{text}</div>
      </div>
    </div>
  );
};

function Feedback({ allFeedbacks, updateFeedbackStatus, credUser }) {
  if (!credUser.id) {
    return <Redirect to="/login" />;
  }

  if (credUser.info.role !== 80) {
    return <Redirect to="/feedback" />;
  }

  return (
    <>
      <div className={s.feedback}>
        <div className={s.head}>
          <div className={s.title}>Все отзывы</div>
        </div>

        <div className={s.feedbacks}>
          {allFeedbacks.map((info) => {
            debugger;
            return (
              <FeedbackItem
                {...info}
                updateFeedbackStatus={updateFeedbackStatus}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({ allFeedbacks: state.allFeedbacks, credUser: state.credUser }),
  {
    updateFeedbackStatus,
  }
)(Feedback);
