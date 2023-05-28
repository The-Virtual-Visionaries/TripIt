import React from 'react'
import './AuthNav.css';
import { useNavigate } from "react-router-dom";

function AuthNav() {

  const navigate = useNavigate();

  const createHandler = () => {
    navigate('/signup');
  }

  const loginHandler = () => {
    navigate('/login');
  }

  return (
    <div className='AuthNav'>
        <div className='auth-logo'>
            <img
            src={require("../assets/tripit_logo.png")}
            alt="logo"
            width="120"
            className="tplogo"
          />
        </div>
        <div className='buttons'>
            <button onClick={loginHandler} type="button">Login</button>
            <button onClick={createHandler} type="button">Create Account</button>
        </div>
    </div>
  )
}

export default AuthNav