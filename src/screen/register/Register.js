import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register ,verify} from "../../redux/actions/userActions";
import "./register.scss";

export default function Register() {
  const initialState = {
    email: "",
    name: "",
   
    
    password: "",
  
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email,name,  password, cf_password} = userData;

  const userRegister = useSelector((state) => state.userRegister);
  const { success } = userRegister;

  const userVery = useSelector((state) => state.userVerify);
  const {verifySuccess} = userVery;
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
      if (
        name !== null &&
       
        email !== null &&
        password !== null 
       
      ) {
        dispatch(register({ name,email,  password }));
      }
    }
  };

  const handleInputVery = (e) => {
    console.log("data: ", e.target.value);
    setCode(e.target.value);
};
const handleSubmitVery = (e)=>{
    e.preventDefault();
  console.log("submit: ",email, code);
  dispatch(verify(email, code));
}

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
   <div>
    
    {verife ? (
      <form className="wrap-form" >
      <h3>Vui long nhap ma xac nhan</h3>
      <div className="mb-3">
      <input
            type="password"
            className="form-control"
            placeholder="Nhập code"
            name="text"
            onChange={handleInputVery}
      />
      </div>
      <div className="mb-3 pt-4">
      <button className="btn-account-submit" onClick={handleSubmitVery}>
            xac nhan
      </button>
      </div>
      
      
      </form>
    )
    :(
      <div className="account-form">
        <div className="text-center mb-3">
          <span className="">
            <Link to="/">
              <img src="https://id.unica.vn/images/logo.png" alt="logo" />
            </Link>
          </span>
        </div>

        <form className="wrap-form" onSubmit={handleSubmit}>
          <h3>Đăng Ký Tài Khoản</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Họ và tên"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Nhập email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
        
        
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              name="password"
              value={password}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Nhập lại mật khẩu"
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
            />
          </div>

          <div className="mb-3 pt-4">
            <button className="btn-account-submit" type="submit">
              Đăng ký
            </button>
          </div>
          <div className="text center">
            <span>Bạn có tài khoản?</span>
            <Link to="/login">Đăng nhập</Link>
            <br />
          </div>
        </form>
      </div>

    )  
  }
    
     
  </div>
 
  );
}
