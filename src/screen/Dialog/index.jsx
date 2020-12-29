// React
import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import {
  logout,
  saveMessage,
  getUpdatedQuery,
  endDialog,
  addRate,
} from "../../redux/reducer";

// Styles
import s from "./Dialog.module.scss";

// Images
import reload from "../../accets/svg/reload.svg";
import send from "../../accets/svg/send.svg";
import findUserById from "../../helpers/findUserById";
import formatFullNameFeedback from "../../helpers/formatFullNameFeedback copy";
import formatDataFeedback from "../../helpers/formatDataFeedback";
import Avatar from "../../helpers/Avatar";
import parseQueryStatus from "../../helpers/parseQueryStatus";

import star_owhite from "../../accets/svg/star_owhite.svg";
import star_outline_owhite from "../../accets/svg/star_outline_owhite.svg";
import getAvgRate from "../../helpers/getAvgRate";

const RateBlock = ({ onSend, onClose }) => {
  const [rate, setRate] = useState(null);
  const [hoverRate, setHoverRate] = useState(null);
  const [error, setError] = useState("");

  const onSendWithVerif = () => {
    if (!rate) {
      setError("Количество звезд менее одной");
    } else {
      onSend(rate);
      onClose();
    }
  };

  return (
    <div className={s.bg}>
      <div className={s.addBlock}>
        <div className={s.title}>Оцените пользователя</div>
        <div className={s.data}>
          <div className={s.rate} onMouseLeave={() => setHoverRate(null)}>
            {[0, 0, 0, 0, 0].map((e, idx) => {
              return idx + 1 <= hoverRate || idx + 1 <= rate ? (
                <img
                  src={star_owhite}
                  alt=""
                  onClick={() => {
                    setError("");
                    setRate(idx + 1);
                  }}
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
        </div>

        {error && <div className={s.error}>{error}</div>}

        <div className="btns">
          <div className={s.btn} onClick={onClose}>
            Отменить
          </div>
          <div className={s.btn + " " + s.close} onClick={onSendWithVerif}>
            Завершить
          </div>
        </div>
      </div>
    </div>
  );
};

const LeftMessage = ({ text, date, authorName, avatar }) => {
  return (
    <div className={`${s.message} ${s.left}`}>
      {/* <div className={s.avatar}></div> */}
      <Avatar size={45} src={avatar} />
      <div>
        <div className={s.infoUser}>
          <div className={s.fullName}>{formatFullNameFeedback(authorName)}</div>
          <div className={s.date}>
            {formatDataFeedback(date.seconds * 1000)}
          </div>
        </div>
        <div className={s.text}>{text}</div>
      </div>
    </div>
  );
};

const RightMessage = ({ text, date, authorName, avatar }) => {
  return (
    <div className={s.ms_r_wrp}>
      <div className={`${s.message} ${s.right}`}>
        <div>
          <div className={s.infoUser}>
            <div className={s.fullName}>
              {formatFullNameFeedback(authorName)}
            </div>
            <div className={s.date}>
              {formatDataFeedback(date.seconds * 1000)}
            </div>
          </div>
          <div className={s.text}>{text}</div>
        </div>
        {/* <div className={s.avatar}></div> */}
        <Avatar size={45} src={avatar} />
      </div>
    </div>
  );
};

const Message = ({ mode, avatar, ...props }) => {
  return mode === "left" ? (
    <LeftMessage {...props} avatar={avatar} />
  ) : (
    <RightMessage {...props} avatar={avatar} />
  );
};

const EndBtn = ({
  endDialog,
  progress,
  userId,
  author1,
  author1IsDone,
  author2,
  author2IsDone,
}) => {
  if (progress === "done") {
    return (
      <button className={s.end} disabled={true}>
        Завершить
      </button>
    );
  }

  if (progress === "proccess") {
    return (
      <button
        className={s.end}
        onClick={() => {
          endDialog();
        }}
      >
        Завершить
      </button>
    );
  }

  let d_1 = userId === author1 && author1IsDone;
  let d_2 = userId === author2 && author2IsDone;

  return (
    <button
      className={s.end}
      onClick={() => {
        endDialog();
      }}
      disabled={userId === author1 ? d_1 : d_2}
    >
      Завершить
    </button>
  );
};

function Dialog({
  querties,
  match,
  credUser,
  users,
  saveMessage,
  getUpdatedQuery,

  endDialog,
  addRate,
}) {
  const [newMessage, setnewMessage] = useState("");
  const [isBlock, setIsBlock] = useState(false);

  // for head
  const idDialog = match.params.id;
  const info =
    querties.length !== 0 ? querties.filter((q) => q.id === idDialog)[0] : null;

  if (!info) {
    return <Redirect to="/querties" />;
  }
  debugger;
  const interlocutorId =
    info.author1 !== credUser.id ? info.author1 : info.author2;
  let interlocutorUnfo = null;
  {
    interlocutorUnfo =
      credUser.id && interlocutorId && findUserById(users, interlocutorId);
  }

  if (!credUser.id) {
    return <Redirect to="/login" />;
  }
  if (info.author1 !== credUser.id && info.author2 !== credUser.id) {
    return <Redirect to={"/querties"} />;
  }

  return (
    <div className={s.dialog}>
      {isBlock && (
        <RateBlock
          onClose={() => {
            setIsBlock(false);
          }}
          onSend={(rate) => {
            addRate(interlocutorId, rate);
            endDialog(
              info.progress,
              idDialog,
              info.author1,
              info.author2,
              credUser.id
            );
          }}
        />
      )}

      <div className={s.head}>
        <div className={s.userUnfo}>
          <Avatar
            src={interlocutorUnfo.info.avatar}
            size={45}
            borderColor="#004e75"
          />
          <div className="intInfo">
            <div className={s.fullName}>
              {interlocutorUnfo
                ? formatFullNameFeedback(interlocutorUnfo.info.fullName)
                : "Загрузка..."}
            </div>
            <div className={s.fullName}>
              {interlocutorUnfo
                ? "Рейтинг: " +
                  getAvgRate(interlocutorUnfo.info.rateArr) +
                  " / 5 (Отзывов: " +
                  interlocutorUnfo.info.rateArr.length +
                  " )"
                : "Загрузка..."}
            </div>
          </div>
        </div>
        <div className={s.status_wrp}>
          <div className={s.reloader} onClick={() => getUpdatedQuery(idDialog)}>
            <img src={reload} alt="" />
          </div>
          <div>{parseQueryStatus(info.progress)}</div>
        </div>

        <EndBtn
          endDialog={() => setIsBlock(true)}
          progress={info.progress}
          userId={credUser.id}
          author1={info.author1}
          author1IsDone={info.author1IsDone}
          author2={info.author2}
          author2IsDone={info.author2IsDone}
        />
      </div>
      <div className={s.messages_wrp}>
        <div className={s.messages}>
          <div className={s.ms}>
            {info.messages
              .sort((prev, next) => prev.date.seconds - next.date.seconds)
              .reverse()
              .map((m) => {
                let authorName =
                  m.author === credUser.id
                    ? credUser.info.fullName
                    : interlocutorUnfo.info.fullName;
                return (
                  <Message
                    avatar={
                      authorName === credUser.info.fullName
                        ? credUser.info.avatar
                        : interlocutorUnfo.info.avatar
                    }
                    mode={
                      authorName === credUser.info.fullName ? "right" : "left"
                    }
                    text={m.text}
                    date={m.date}
                    author={m.author}
                    authorName={authorName}
                  />
                );
              })}
          </div>
          <div className={s.addNewMessage}>
            <input
              type="text"
              name=""
              id=""
              value={newMessage}
              onChange={(e) => setnewMessage(e.target.value)}
            />
            <img
              src={send}
              alt=""
              onClick={() => {
                saveMessage(idDialog, newMessage, info.messages);
                setnewMessage("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      credUser: state.credUser,
      querties: state.querties,
      credUser: state.credUser,
      users: state.users,
    };
  },
  {
    logout,
    saveMessage,
    getUpdatedQuery,
    endDialog,
    addRate,
  }
)(Dialog);
