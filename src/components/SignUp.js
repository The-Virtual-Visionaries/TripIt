import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="shadow-container">
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <div className="account-title">Create Account</div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <label for="inputPassword5" class="form-label">Password</label>
        <input type="password" id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit" className="account-button">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;