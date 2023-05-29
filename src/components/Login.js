import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    const errors = validateInputs();

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/create");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateInputs = () => {
    let errors = [];
    if (!email.trim()) {
      errors.push("Email should not be empty");
    }

    if (!password.trim()) {
      errors.push("Password should not be empty");
    }

    return errors;
  };

  return (
    <div className="shadow-container">
      <div className="sign-in-container">
        <form onSubmit={signIn}>
          <div className="login-title">Login</div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <label for="inputPassword5" class="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            aria-labelledby="passwordHelpBlock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {errors.length > 0 && (
            <div className="error-container">
              {errors.map((error, index) => (
                <div key={index} className="error-message">
                  {error}
                </div>
              ))}
            </div>
          )}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
