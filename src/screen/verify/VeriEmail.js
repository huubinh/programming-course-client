import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { verify} from "../../redux/actions/userActions";


export default function VeriEmail(props) {

  const userVery = useSelector((state) => state.userVerify);
 
  const {verifySuccess} = userVery;
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

//   const navigate = useNavigate();

  
  

  const handleInputVery = (e) => {
      console.log("data: ", e.target.value);
      setCode(e.target.value);
  };
  const handleSubmitVery = (e)=>{
      e.preventDefault();
    console.log("submit: ", props.email, code);
    dispatch(verify(props.email, code));
  }

 
  // useEffect(() => {
  //   setVerify(true);
  //   if (verifySuccess) {
  //     console.log("xac nhan ok: ", verifySuccess);
  //     // navigate("/login", { replace: true });
  //   }
  //   else{
  //     console.log("loi xac nhan");
  //   }
  // }, [ verifySuccess]);
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
  console.log("submit: ", props.email)

  return (
   <div>
   
   
      
      
      
      
   
     
  </div>
 
  );
}
