import React, { useContext } from 'react'
import { Box,IconButton,useTheme } from '@mui/material'
import { ColorModeContext,tokens } from '../../utils/theme';
import {InputBase} from '@mui/material';
import { 
  SearchOutlined,
  LightModeOutlined,
  DarkModeOutlined,
  NotificationsOutlined,
  SettingsOutlined,
  PersonOutlined
  
 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const navigate = useNavigate();
  return (
    
    <Box display='flex' justifyContent='space-between' p={2}> 
      <Box 
        display='flex'
        backgroundColor={colors.primary[400]}
        borderRadius='3px'  
      >
         <InputBase sx={{ml: 2,flex: 1}} placeholder='Search'/>
         <IconButton type='button' sx={{p:1}}>
          <SearchOutlined/>
         </IconButton>
      </Box>

        <Box display='flex'>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode == 'dark' ? (<DarkModeOutlined />): 
            (<LightModeOutlined />)
            }
            
          </IconButton>

          <IconButton>
            <NotificationsOutlined />
          </IconButton>

          <IconButton>
            <SettingsOutlined />
          </IconButton>

          <IconButton>
            <PersonOutlined onClick={() => navigate('/profile')}/>
          </IconButton>
        </Box>
    </Box>
  )
}

export default Topbar
