import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
import './header.css';
import { RampRight } from '@mui/icons-material';
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        console.log("Clicked");
        setMenuOpen((prevState) => !prevState);
    };

    const closeMenu = (e) => {
        if(e.target.className != "hamburger-react")
            setMenuOpen(false)
    }

    const getMenuStyles = () => {
        return { right: !menuOpen && "-200%" };
    };

    return (
        <section className="h-wrapper">
            <div className="h-container">
                <h1>Propertease</h1>
                <OutsideClickHandler onOutsideClick={closeMenu}>
                    <div style={getMenuStyles()} className="h-menu">
                        <a href="">Home</a>
                        <a href="">Residencies</a>
                        <a href="">Contact Us</a>
                        <a href="#residencies">FAQ</a>
                        <button className="button">
                            <a href="">Sign in</a>
                        </button>
                    </div>
                </OutsideClickHandler>
                
                <div className="menu-icon">
                    <button className='menu-btn' onClick={toggleMenu}>
                        <Hamburger
                            direction='right'
                            easing="ease-in" 
                            color={"white"}
                            toggled={menuOpen}
                        />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Header;
