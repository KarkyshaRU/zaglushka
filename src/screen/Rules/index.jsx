import React from "react";

// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/reducer";

// Components
import Header from "../../components/Header";

// Styles
import s from "./Rules.module.scss";

function Rules({ credUser, logout }) {
  debugger;
  return (
    <>
      <div className={s.dev}>
        Страница условий пользования сервисом в разработке
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
)(Rules);
