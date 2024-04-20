import React, { useState } from 'react';
// import Hamburger from 'hamburger-react';
import './dashboard.css';
import { RampRight } from '@mui/icons-material';
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from 'react-router-dom';
const Dashboard = () => {
    // const [menuOpen, setMenuOpen] = useState(false);

    // const toggleMenu = () => {
    //     console.log("Clicked");
    //     setMenuOpen((prevState) => !prevState);
    // };

    // const closeMenu = (e) => {
    //     if(e.target.className != "hamburger-react")
    //         setMenuOpen(false)
    // }

    // const getMenuStyles = () => {
    //     return { right: !menuOpen && "-200%" };
    // };

    return (
        <section className="h-wrapper">
            <div className="h-container">
                    <div style={getMenuStyles()} className="h-menu">
                        <Link to='/dashboard'>Dashboard</Link>
                        <a href="#properties">Properties</a>
                        {/* // <Link to='/#contact'> <a href="#contact">Contact Us</a></Link>
                        {/*  */}
                        {/* <a href="#FAQ">FAQ</a> */ }
         
                    </div>
             
                
                {/* <div className="menu-icon">
                    <button className='menu-btn' onClick={toggleMenu}>
                        <Hamburger
                            direction='right'
                            easing="ease-in" 
                            color={"white"}
                            toggled={menuOpen}
                        />
                    </button>
                </div> */}
            </div>
        </section>
    );
};

export default Dashboard;
