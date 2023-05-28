import React from 'react'
import About from './About';
import Offerings from './Offerings';

export default function Mainpage() {
  return (
    <div className='Mainpage'>
      <div>
        <About />
        <Offerings />
      </div>
    </div>
  )
}
