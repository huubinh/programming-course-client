import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fogot} from "../../redux/actions/userActions";
import "./verifyEmail.scss";

export default function VeriEmail() {

  const userForgot = useSelector((state) => state.fogotPass);
  const { SuccessforgotPass } = userForgot;
  const [code, setCode] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

//   const navigate = useNavigate();

  
  

  const handleInputVery = (e) => {
      console.log("data: ", e.target.value);
      setEmail(e.target.value);
  };
  const handleSubmitVery = (e)=>{
      e.preventDefault();
  
    dispatch(fogot(email));
     
   
  }

 
  useEffect(() => {
    
    if (SuccessforgotPass) {
      console.log("gui ve: ", SuccessforgotPass);
      navigate("/login", { replace: true });
    }
   
  
  }, [ SuccessforgotPass ]);
  // useEffect(() => {
  //   console.log("vao r ma");
  //   if (success) {
  //     console.log("vao car day r ma: ", success);
  //     setVerify(true);
  //   }
  //   else{
  //     console.log("ko vao : ", success);
  //   }
  // },  [success]);


  return (
    <div>
      {code ? (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
          <form className="wrap-form" >
          <h3>nhap tai khoan gmail </h3>
          <div className="mb-3">
          <input
                type="text"
                className="form-control"
                placeholder="Nhập gmail"
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
          </div>
        </div>
       
      </div>
        

        
      ) :(<div>
          <h1>khong ton tai tai khoan email, hoac tai khoan chua dc dang ki</h1>
          <Link to="/login">quay lai</Link>
        </div>)
        }
    </div>
  
  
 
  );
}
