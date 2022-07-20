import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout , reset} from "../../../redux/actions/userActions";
import { Button, Modal } from "antd";

import "./header.scss";
import "antd/dist/antd.css";

export default function Header() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const userReset = useSelector((state) => state.resetPasss);
  console.log("user: ", userSignin);
  const { userInfo } = userSignin;
  const {resetPass} = userReset;
  const [ pass, setPass1 ] = useState("");

  const signoutHandler = () => {
    dispatch(signout());
  };
  const [visible, setVisible] = useState(false);

  const handlePass = (e) => {
    console.log(e.target.value);
    setPass1(e.target.value);
  };

  const doiPass = (e) => {
    e.preventDefault();
    dispatch(reset(pass, userInfo.result.tokens));
    setVisible(false);
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
                 {console.log("token", userInfo.result.tokens)}
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
                  <Dropdown.Item>
                    <Button type="primary" onClick={() => setVisible(true)}>
                      reset pass
                    </Button>
                    <Modal
                      title="reset mk"
                      centered
                      visible={visible}
                      onOk={doiPass}
                      onCancel={() => setVisible(false)}
                      width={1000}
                    >
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập mat khau"
                          name="text"
                          onChange={handlePass}
                        />
                      </div>
                      {/* <div>
                        <button onClick={doiPass}>ok</button>
                      </div> */}
                    </Modal>
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
