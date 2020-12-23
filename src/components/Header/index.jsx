// React
import React from "react";

// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/reducer";

// Styles
import s from "./Heade.module.scss";

// Components
import Logo from "../Logo";
import MyMenu from "../Menu";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import Avatar from "../../helpers/Avatar";

const Header = ({ credUser, logout }) => {
  const { id, info } = credUser;
  let avatar = null;
  let role = null;
  let email = null;

  if (info) {
    role = info.role;
    email = info.email;
  }

  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={s.header}>
      <Logo />

      <div className={s.r}>
        <MyMenu isLogin={id} isAdmin={role === 80} />
      </div>

      {id && (
        <div className={s.trt}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className={s.userInfo} onClick={handleClick}>
              <Avatar size={30} scr={""} />
              <div className={s.email}>{id && email}</div>
            </div>
          </Button>
          <Menu
            id="simple-menu"
            className={s.menu}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} className={s.menuItem}>
              <NavLink to={"/profile/" + id}>Мой профиль</NavLink>
            </MenuItem>
            <MenuItem onClick={logout} className={s.menuItem}>
              <NavLink to="#">Выйти</NavLink>
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => {
    return { credUser: state.credUser };
  },
  {
    logout,
  }
)(Header);
