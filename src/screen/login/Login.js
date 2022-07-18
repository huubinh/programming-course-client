import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../redux/actions/userActions";
import "./login.scss";

export default function Login(props) {
  const initialState = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div className="account-form">
      <div className="text-center mb-3">
        <span className="logo-brand">
          <Link to="/">
            <img src="/logo.png" alt="logo" />
            <span>XCODE</span>
          </Link>
        </span>
      </div>
      <form className="wrap-form" onSubmit={handleSubmit}>
        <h3 style={{ fontWeight: "bold" }}>サインイン</h3>
        <div className="mt-3 mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="メール"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="パスワード"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-4 pt-4">
          <button className="btn-account-submit" type="submit">
            サインイン
          </button>
        </div>

        <div className="text center">
          {/* <span>新しいユーザー?</span> */}
          <Link to="/register">サインアップ</Link>
          <br />
          <div style={{ marginTop: "16px" }}>
            <Link to="/">パースワードを忘れた？</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
