import React, { useState } from 'react'
import {Sidebar,Menu,MenuItem} from 'react-pro-sidebar'
import {Link} from 'react-router-dom'
// import "react-pro-sidebar/dist/css/styles.css";
import {
  Box,IconButton,Typography,useTheme
} from '@mui/material'

import {
  HomeOutlined,
  HouseOutlined,
  SettingsOutlined,
  PeopleOutlined,
  ContactsOutlined,
  ReceiptOutlined,
  PersonOutlined,
  CalendarTodayOutlined,
  HelpOutlined,
  BarChartOutlined,
  PieChartOutlined,
  TimelineOutlined,
  MenuOutlined,
  MapOutlined,
  HelpOutlineOutlined ,
  PieChartOutlineOutlined,
  MoneyOutlined,
  ReportOutlined,
  NotificationsOutlined,
  MessageOutlined,
  LogoDevOutlined,
  LogoutOutlined,
  
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { tokens } from '../../utils/theme.js';

import {signOutUserSuccess,signOutUserFailure,signOutUserStart} from '../../redux/user/userSlice.js'


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const value = selected === title ? 500 : 100;
  return (
    <Link to={to}>
        <MenuItem
          active={selected === title}
          style={{
            color: colors.greenAccent[value],
            backgroundColor: `${colors.primary[400]}`
          }}
          onClick={() => setSelected(title)}
          icon={icon}
        >
          <Typography>{title}</Typography>
          
        </MenuItem>
    </Link>
  );
};

const SideBarCmp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const {currentUser} = useSelector(state => state.user)

  const dispatch = useDispatch()
  const handleSignOUt = async (e) => {
    e.preventDefault();
    console.log("hii");
    try {
        dispatch(signOutUserStart())
         const res = await fetch('/api/auth/signout')
         const data = await res.json();
         if(data.success == false) {
            return;
         }
         dispatch(signOutUserSuccess(data))
         navigate('/')
         console.log("Sign out successfull..");
    }catch(err) {
        dispatch(signOutUserFailure(err.message))
    }
}
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background:`${colors.primary[100]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        height: '100vh',
        overflow: 'auto', // This line ensures scrolling functionality while hiding the scrollbar
        '-ms-overflow-style': 'none',  // Hide scrollbar for IE, Edge, and Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
        },
        paddingRight: "2.6rem"
      }}
    >
      <Sidebar collapsed={isCollapsed} 
      >

        <Menu iconShape="square"
        >
            
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlined/> : undefined}
              style={{
                p: "10px 0 20px 0",
                color: colors.grey[100],
                backgroundColor: `${colors.primary[400]}`
              }}
              
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                  
                >
                  <Typography variant="h3" color={colors.grey[100]}
                    sx={{
                      backgroundColor: `${colors.primary[400]}`
                    }}
                  >
                    {currentUser.role && currentUser.role == 'admin' && <h2>Admin</h2>}
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlined />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box paddingBottom={0} sx={{
                backgroundColor: `${colors.primary[400]}`
              }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={currentUser.avatar}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ p: "10px 0 0 0",
                    backgroundColor: `${colors.primary[400]}`
                     }}
                  >
                    {currentUser.username}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}
                  sx={{
                    backgroundColor: `${colors.primary[400]}`,
                    paddingTop: 3
                  }}>
                    
                  </Typography>
                </Box>
              </Box>
            )}

            <Box >
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlined />}
                selected={selected}
                setSelected={setSelected}
              />


              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ p: "15px 0 5px 20px",
                backgroundColor: `${colors.primary[400]}`
                 }}
              >
                Pages
              </Typography>
              {currentUser.role === 'owner' && (
                              <Item
                              title="Add new property"
                              to="/property"
                              icon={<HouseOutlined />}
                              selected={selected}
                              setSelected={setSelected}
                            />
              )}
              {currentUser.role === 'owner' && (
                  <Item
                  title="Tenants"
                  to="tenants"
                  icon={<PersonOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                />
              )}
              {currentUser.role === 'tenant' && (
                  <Item
                  title="Properties"
                  to="/properties/search"
                  icon={<HomeOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                />
              )}
              {currentUser.role === 'tenant' && (
                  <Item
                  title="Payments"
                  to="/payment-history"
                  icon={<MoneyOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                />
              )}
              {currentUser.role != 'admin' && (
                              <Item
                              title="Lease requests"
                              to="/dashboard/lease-requests"
                              icon={<ReceiptOutlined />}
                              selected={selected}
                              setSelected={setSelected}
                            />
              )}
              <Item
                title="Calendar"
                to="/dashboard/calendar"
                icon={<CalendarTodayOutlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Maintenance"
                to="/dashboard/maintenance-form"
                icon={<SettingsOutlined />}
                selected={selected}
                setSelected={setSelected}
              />

              {/* <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ p: "15px 0 5px 20px",
                backgroundColor: `${colors.primary[400]}`
                 }}
              >
                Charts
              </Typography>
              <Item
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Geography Chart"
                to="/geography"
                icon={<MapOutlined />}
                selected={selected}
                setSelected={setSelected}
              /> */}
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ p: "15px 0 5px 20px",
                backgroundColor: `${colors.primary[400]}`
                 }}
              >
                Others
              </Typography>

              <Item
                title="Notification"
                to="/Notifications"
                icon={<NotificationsOutlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Messages"
                to="/messages"
                icon={<MessageOutlined />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Log out"
                to="/"
                icon={<LogoutOutlined onClick={handleSignOUt}/>}
                selected={selected}
                setSelected={setSelected}
              />
              
            </Box>
          </Menu>
      </Sidebar>
    </Box>
  );
};


export default SideBarCmp
