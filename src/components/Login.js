import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigateToCreateAcc = () => {
    navigate('/signup');
  }

  return (
    <div classNameName="sign-in-container">
      <form onSubmit={signIn}>
        <div classNameName="login-title">Login</div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <label for="inputPassword5" className="form-label">Password</label>
        <input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit" classNameName="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;