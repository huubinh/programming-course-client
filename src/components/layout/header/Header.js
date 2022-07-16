import React from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../../redux/actions/userActions";
import "./header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  console.log("user: ",userSignin)
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
              <img
                src="https://cdn-icons.flaticon.com/png/512/2888/premium/2888414.png?token=exp=1657596224~hmac=6311dba77e1bee83aad7985800059c9e"
                alt="logo"
              />
              <span>XCODE</span>
            </Link>
          </div>
          
          {userInfo !== null ? (
            <div className="nav-user-action">
            
              <img src={userInfo.result.user.avatar} alt="avatar" />

              <Dropdown className="d-inline mx-2 cus-dropdown">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  {userInfo.result.user.email}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/user/profile">プロフィール</Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signoutHandler}>
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
