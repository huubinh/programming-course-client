import React from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../../redux/actions/userActions";
import "./header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  // console.log("user: ", userSignin);
  const { userInfo } = userSignin;

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <header>
      <div className="container">
        <div className="header-wrapper">
          <div className="logo-brand">
            <Link to="/">
              <img src="/logo.png" alt="logo" />
              <span>XCODE</span>
            </Link>
          </div>

          {userInfo !== null ? (
            <div className="nav-user-action">
              <img src={userInfo.user.avatar} alt="avatar" />

              <Dropdown className="d-inline mx-2 cus-dropdown">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  <span className="dropdown" style={{ marginRight: "6px" }}>
                    {userInfo.user.name}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/user/profile">プロフィール</Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signoutHandler} className="dropdown">
                    サインアウト
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div className="nav-user-action">
              <Link to="./login" className="btn btn-login">
                サインイン
              </Link>
              <Link to="./register" className="btn btn-register">
                サインアップ
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
