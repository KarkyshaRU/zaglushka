import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { addFeedback } from "../../redux/reducer";

// Styles
import s from "./Feedback.module.scss";

// Images
import plus from "../../accets/svg/plus.svg";
import star_white from "../../accets/svg/star_white.svg";
import star_outline_white from "../../accets/svg/star_outline_white.svg";

import star_owhite from "../../accets/svg/star_owhite.svg";
import star_outline_owhite from "../../accets/svg/star_outline_owhite.svg";
import formatDataFeedback from "../../helpers/formatDataFeedback";
import formatFullNameFeedback from "../../helpers/formatFullNameFeedback copy";

const AddBlock = ({ onSend, onClose }) => {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(null);
  const [hoverRate, setHoverRate] = useState(null);
  const [error, setError] = useState("");

  const onSendWithVerif = () => {
    if (text.length < 5) {
      setError("Длина отзыва менее 5 символов");
    } else if (!rate) {
      setError("Количество звезд менее одной");
    } else {
      onSend(rate, text);
    }
  };

  return (
    <div className={s.bg}>
      <div className={s.addBlock}>
        <div className={s.data}>
          <div className={s.rate} onMouseLeave={() => setHoverRate(null)}>
            {[0, 0, 0, 0, 0].map((e, idx) => {
              return idx + 1 <= hoverRate || idx + 1 <= rate ? (
                <img
                  src={star_owhite}
                  alt=""
                  onClick={() => setRate(idx + 1)}
                  onMouseEnter={() => setHoverRate(idx + 1)}
                />
              ) : (
                <img
                  src={star_outline_owhite}
                  alt=""
                  onClick={() => setRate(idx + 1)}
                  onMouseEnter={() => setHoverRate(idx + 1)}
                />
              );
            })}
          </div>
          <div className={s.text}>
            <textarea
              name="text"
              cols="30"
              rows="10"
              placeholder="Ваш отзыв..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </div>
        </div>

        {error && <div className={s.error}>{error}</div>}

        <div className="btns">
          <div className={s.btn + " " + s.close} onClick={onClose}>
            Закрыть
          </div>
          <div className={s.btn} onClick={onSendWithVerif}>
            Отправить
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackItem = ({ text, date, userName, userId, rate }) => {
  debugger;
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
          </div>
        </div>
        <div className={s.text}>{text}</div>
      </div>
    </div>
  );
};

function Feedback({ lastFeddbacks, addFeedback, credUser }) {
  const [block, setblock] = useState(false);

  const onSend = (rate, text) => {
    addFeedback(rate, text);
    setblock(false);
  };

  if (!credUser.id) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {block && <AddBlock onSend={onSend} onClose={() => setblock(false)} />}
      <div className={s.feedback}>
        <div className={s.head}>
          <div className={s.title}>Отзывы</div>
          <div className={s.add} onClick={() => setblock(true)}>
            <img src={plus} alt="Добавить отзыв" />
          </div>
        </div>

        <div className={s.feedbacks}>
          {lastFeddbacks.map((info) => {
            return <FeedbackItem {...info} />;
          })}
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({ lastFeddbacks: state.lastFeddbacks, credUser: state.credUser }),
  {
    addFeedback,
  }
)(Feedback);
