import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signout, reset } from "../../../redux/actions/userActions";
import { Button, Modal } from "antd";
import "antd/dist/antd.css";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { toast } from "react-toastify";

export default function Header() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const userReset = useSelector((state) => state.resetPasss);
  console.log("user: ", userSignin);
  const { userInfo } = userSignin;
  const { resetPass } = userReset;
  const [pass, setPass1] = useState("");
  // console.log("user: ", userSignin);
  const navigate = useNavigate();

  const signoutHandler = () => {
    dispatch(signout());
    navigate("/login");
  };
  const [visible, setVisible] = useState(false);

  const handlePass = (e) => {
    console.log(e.target.value);
    setPass1(e.target.value);
  };

  const doiPass = (e) => {
    e.preventDefault();
    dispatch(reset(pass, userInfo.tokens));
    setVisible(false);
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
              {console.log("token", userInfo.tokens)}
              <img src={userInfo.user.avatar} alt="avatar" />

              <Dropdown className="d-inline mx-2 cus-dropdown">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  <span className="dropdown" style={{ marginRight: "6px" }}>
                    {userInfo.user.name}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => navigate("/user/profile")}
                    className="dropdown"
                  >
                    プロフィール
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signoutHandler} className="dropdown">
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
