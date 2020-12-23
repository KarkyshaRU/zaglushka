// React
import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logout, saveMessage, getUpdatedQuery } from "../../redux/reducer";

// Styles
import s from "./Dialog.module.scss";

// Images
import reload from "../../accets/svg/reload.svg";
import send from "../../accets/svg/send.svg";
import findUserById from "../../helpers/findUserById";
import formatFullNameFeedback from "../../helpers/formatFullNameFeedback copy";
import formatDataFeedback from "../../helpers/formatDataFeedback";

const LeftMessage = ({ text, date, authorName }) => {
  return (
    <div className={`${s.message} ${s.left}`}>
      <div className={s.avatar}></div>
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

const RightMessage = ({ text, date, authorName }) => {
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
        <div className={s.avatar}></div>
      </div>
    </div>
  );
};

const Message = ({ mode, ...props }) => {
  return mode === "left" ? (
    <LeftMessage {...props} />
  ) : (
    <RightMessage {...props} />
  );
};

function Dialog({
  querties,
  match,
  credUser,
  users,
  saveMessage,
  getUpdatedQuery,
}) {
  // for head
  const idDialog = match.params.id;
  const info =
    querties.length !== 0
      ? querties.filter((q) => q.id === idDialog)[0]
      : { messages: [] };

  const interlocutorId =
    info.author1 !== credUser.id ? info.author1 : info.author2;
  let interlocutorUnfo = null;
  {
    interlocutorUnfo =
      credUser.id && interlocutorId && findUserById(users, interlocutorId);
  }

  const [newMessage, setnewMessage] = useState("");

  if (!credUser.id) {
    return <Redirect to="/login" />;
  }
  if (info.author1 !== credUser.id && info.author2 !== credUser.id) {
    return <Redirect to={"/querties"} />;
  }

  return (
    <div className={s.dialog}>
      <div className={s.head}>
        <div className={s.userUnfo}>
          <div className={s.avatar}></div>
          <div className={s.fullName}>
            {interlocutorUnfo
              ? formatFullNameFeedback(interlocutorUnfo.info.fullName)
              : "Загрузка..."}
          </div>
        </div>
        <div className={s.status_wrp}>
          <div className={s.reloader} onClick={() => getUpdatedQuery(idDialog)}>
            <img src={reload} alt="" />
          </div>
          <div>в процессе</div>
        </div>

        <div className={s.end}>
          <NavLink to="/querties">Завершить</NavLink>
        </div>
      </div>
      <div className={s.messages_wrp}>
        <div className={s.messages}>
          <div className={s.ms}>
            {info.messages
              .sort((prev, next) => prev.date.seconds - next.date.seconds)
              .reverse()
              .map((m) => {
                debugger;
                let authorName =
                  m.author === credUser.id
                    ? credUser.info.fullName
                    : interlocutorUnfo.info.fullName;
                debugger;
                return (
                  <Message
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
  }
)(Dialog);
