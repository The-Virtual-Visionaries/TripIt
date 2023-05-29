import React from 'react'
import './About.css';
import AuthNav from '../components/AuthNav';
import { useNavigate } from "react-router-dom";
import TypingAnimation from './TypingAnimation';

function About() {

    const navigate = useNavigate();

    const offeringHandler = () => {
        const offeringsDiv = document.getElementById('Offerings');
        if (offeringsDiv) {
            offeringsDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
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

            <div className='Offerings' id="Offerings">
                <div className='offering'>Our Offerings</div>
                <div className='offering-text'>
                    <div className='offering-para'>TripIt is a website designed to streamline and simplify the process of planning your travel itineraries. Our platform harnesses the power of artificial intelligence to create personalized itineraries tailored to your preferences and travel needs.</div>
                    <br></br>
                    <div className='offering-para'>With TripIt, all you need to do is provide your travel destination, dates, and travel preferences and it will generate an itinerary for you. We also offer you the flexibility to view, add and edit places in your itinerary. </div>
                    <br></br>
                    <div className='offering-para'>Say goodbye to the hassle of using multiple apps and endless spreadsheets. TripIt consolidates all your travel information into one website, making it a breeze to access your itinerary from any device anytime and anywhere.</div>
                </div>
            </div>
        </>
    )
}

export default About