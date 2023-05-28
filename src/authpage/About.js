import React from 'react'
import './About.css';
import AuthNav from '../components/AuthNav';
import { useNavigate } from "react-router-dom";
import TypingAnimation from './TypingAnimation';

function About() {

  const navigate = useNavigate();

  const offeringHandler = () => {
    navigate('/offerings');
  }

  return (
    <div className='About'>
      <div className='authnav'>
        <AuthNav />
      </div>
      <div className='centered-content'>
        <TypingAnimation />
        <div>
          <button onClick={offeringHandler} className='about-button' type="button">Our Offerings</button>
        </div>
      </div>
    </div>
  )
}

export default About