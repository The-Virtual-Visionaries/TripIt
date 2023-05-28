import React from 'react'
import './About.css';

function About() {
  return (
    <div className='About'>
        <div className='about-overlay'></div>
        <div className='about-text'>
            <div className='about-title'>TripIt. Simplify your Itinerary Planning</div>
            <br></br>
            <div className='about-para'>TripIt is a website designed to streamline and simplify the process of planning your travel itineraries. Our platform harnesses the power of artificial intelligence to create personalized itineraries tailored to your preferences and travel needs.</div>
            <br></br>
            <div className='about-para'>With TripIt, all you need to do is provide your travel destination, dates, and travel preferences and it will generate an itinerary for you. We also offer you the flexibility to view, add and edit places in your itinerary. </div>
            <br></br>
            <div className='about-para'>Keeping track of your previous curated itineraries is made effortless with TripIt.</div>
        </div>
        <img
            src={require("../assets/tripit-logo-black.png")}
            alt="logo"
            width="120"
            className="about-pic"
        />
    </div>
  )
}

export default About