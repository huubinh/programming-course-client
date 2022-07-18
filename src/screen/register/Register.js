import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, verify } from "../../redux/actions/userActions";
import "./register.scss";

export default function Register() {
  const initialState = {
    email: "",
    name: "",

    password: "",

    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, name, password, cf_password } = userData;

  const userRegister = useSelector((state) => state.userRegister);
  const { success } = userRegister;

  const userVery = useSelector((state) => state.userVerify);
  const { verifySuccess } = userVery;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [verife, setVerify] = useState(false);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const [code, setCode] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === cf_password) {
      if (name !== null && email !== null && password !== null) {
        dispatch(register({ name, email, password }));
      }
    }
  };

  const handleInputVery = (e) => {
    console.log("data: ", e.target.value);
    setCode(e.target.value);
  };
  const handleSubmitVery = (e) => {
    e.preventDefault();
    console.log("submit: ", email, code);
    dispatch(verify(email, code));
  };

  // useEffect(() => {
  //   console.log("vao r ma");
  //   if (success) {
  //     console.log("vao car day r ma");
  //     setVerify(true);
  //   }
  //   else{
  //     console.log("ko vao : ", success);
  //   }
  // },  [success]);

  useEffect(() => {
    if (success) {
      // navigate("/login", { replace: true });
      setVerify(true);
    }
  }, [navigate, success]);

  useEffect(() => {
    console.log("data veri: ", verifySuccess);
    if (verifySuccess) {
      navigate("/login", { replace: true });
      // setVerify(true);
    }
  }, [navigate, verifySuccess]);

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

      {verife ? (
        <form className="wrap-form">
          <h3 style={{ fontWeight: "bold" }}>認証コードを入力</h3>
          <div className="mt-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="6桁のコードを入力"
              name="text"
              value={code}
              onChange={handleInputVery}
            />
          </div>
          <div className="mb-3 pt-4">
            <button className="btn-account-submit" onClick={handleSubmitVery}>
              認証
            </button>
          </div>
        </form>
      ) : (
        <form className="wrap-form" onSubmit={handleSubmit}>
          <h3 style={{ fontWeight: "bold" }}>サインアップ</h3>
          <div className="mt-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="名前"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="メール"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          {/* <div className="mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="生年月日"
            name="DoB"
            value={DoB}
            onChange={handleChangeInput}
          />
        </div> */}
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="パスワード(もう一度入力)"
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
            />
          </div>

          <div className="mb-3 pt-4">
            <button className="btn-account-submit" type="submit">
              サインアップ
            </button>
          </div>
          <div className="text center">
            {/* <span>Bạn có tài khoản?</span> */}
            <Link to="/login">サインイン</Link>
            <br />
          </div>
        </form>
      )}
    </div>
  );
}
