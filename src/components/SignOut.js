import React from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import './SignOut.css';

function SignOut() {

    const navigate = useNavigate();

    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("sign out successful");
            navigate('/');
          })
          .catch((error) => console.log(error));
      };

    return (
        <div>
            <button onClick={userSignOut} type="submit" className='logout-btn'>Logout</button>
        </div>
    )
}

export default SignOut