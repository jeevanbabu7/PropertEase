import React from 'react'
import './getStarted.css'
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

                <button className='button get-started-btn'>
                    <form action="/properties">
                        <a href="/sign-in">Get Started</a>
                    </form>
                </button>
            </div>
        </div>
    </section>
  )
}

export default GetStarted
