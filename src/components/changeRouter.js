import React from "react";
import { useLocation } from "react-router-dom";
import Register from "../screen/register/Register";
import Login from "../screen/login/Login";
import VeriEmail from "../screen/verify/VeriEmail";
import MainLayout from "../screen/MainLayout";
function ChangeRouter() {
  let currentPath = useLocation().pathname;
  function change() {
    switch (currentPath) {
      case "/register":
        return <Register />;
      case "/login":
        return <Login />;
      case "/veri":
        return <VeriEmail />;
      default:
        return <MainLayout />;
    }
  }
  return <div>{change()}</div>;
}

export default ChangeRouter;
