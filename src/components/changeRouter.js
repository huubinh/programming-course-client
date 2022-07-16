import React from 'react';
import { useLocation } from 'react-router-dom';
import App from '../App';
import Register from '../screen/register/Register';
import Login from '../screen/login/Login';
import VeriEmail from '../screen/verify/VeriEmail';
function ChangeRouter() {
    let currentPath = useLocation().pathname;
    function change() {
        switch(currentPath){
            case "/register":
                return <Register/>
            case "/login":
                return <Login/>
                case "/veri":
                    return <VeriEmail />
            default:
                return <App/>
        }
    }
    return (
        <div>
            {change()}
        </div>
    );
}

export default ChangeRouter;
