import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hamburger from 'hamburger-react';
import { RampRight } from '@mui/icons-material';
import OutsideClickHandler from "react-outside-click-handler";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Tooltip
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import './header.css';

function AccountMenu({imgUrl}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}><img src={imgUrl} alt="Profile" style={{width:"32px"}}/></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link to='/profile'>
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" /> {/* Assuming SettingsIcon is imported */}
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" /> {/* Assuming LogoutIcon is imported */}
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

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

    // For the conditional rendering of profile photo
    const { currentUser } = useSelector(state => state.user);


    return (
        <section className="h-wrapper">
            <div className="h-container">
                <h1>PropertEase</h1>
                <OutsideClickHandler onOutsideClick={closeMenu}>
                    <div style={getMenuStyles()} className="h-menu">
                        <Link to='/'>Home</Link>
                        <Link to='/properties'>Properties</Link>
                        <a href="#contact">Contact Us</a>
                        <a href="#FAQ">FAQ</a>
                        
                        {currentUser ? (
                            <AccountMenu imgUrl={currentUser.avatar}/>
                        ):(
                            <Link to='/sign-in'>                        
                                <button className="button">
                                    <a href="">Sign in</a>
                                </button>
                            </Link>
                        )}
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
