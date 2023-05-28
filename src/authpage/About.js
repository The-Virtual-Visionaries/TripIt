import React from 'react'
import './About.css';
import AuthNav from '../components/AuthNav';
import { useNavigate } from "react-router-dom";
import TypingAnimation from './TypingAnimation';

function About() {

  const navigate = useNavigate();

  const loginHandler = () => {
    navigate('/login');
  }

  return (
    <div className='About'>
      <div className='authnav'>
        <AuthNav />
      </div>
      <div className='centered-content'>
        <TypingAnimation />
        <div>
          <button onClick={loginHandler} className='about-button' type="button">Login</button>
        </div>
      </div>
    </div>
  )
}

export default About