import React from 'react'
import './getStarted.css'
import { Link } from 'react-router-dom'
const GetStarted = () => {
  return (
    <section className="g-wrapper">
        <div className="paddings innerWidth g-container">
            <div className="flexColCenter inner-container">
                <span className='primaryText'>Get Started with Propertease</span>
                <span className='secondaryText'>
                    Subscribe and find super attractive price quotes from propertease <br />
                    Find your residence soon
                </span>

                
                <Link to="/sign-up/tenant">
                <button className='button get-started-btn'>
                   
                        Get Started
                    
                   </button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default GetStarted
