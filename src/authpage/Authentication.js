import React from 'react'
import About from './About';
import AuthNav from '../components/AuthNav';
import './Authentication.css';

export default function Authentication() {
  return (
    <div className='Authentication'>
        <AuthNav />
        <About />
    </div>
  )
}
