import React, { useState } from 'react'
import { Grid } from '@mui/material'
import {Box,TextField} from '@mui/material'

import './profile.css'
const Profile = () => {
    const boxStyles = {
        width:"18rem"
    }

    const [userData,setUserDate] = useState({
        username: "",
        email: "",
        
    });

  return (
    <section className="profile-container">
            
        <Grid container spacing={2}>
            <Grid item xs={12} md={5} sx={{
                backgroundColor:"pink"
            }}>
                <Box
                    display="flex"
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    gap={3}
                >
                  
                    <img src="https://lh3.googleusercontent.com/a/ACg8ocJ5z5YTE6kYYfj21tJJo_hytISefYsDEMoXJ489Ru3u6pq65Q=s96-c" alt="Profile" className='profile--img'/>
                    <TextField
                        id="outlined-required"
                        label="Name"
                        defaultValue="Hello World"
                        sx={boxStyles}
                        />
                    <TextField
                        id="outlined-required"
                        label="Email"
                        defaultValue="Hello World"
                        sx={boxStyles}
                        />
                    </Box>
            </Grid>
            <Grid item xs={12} md={7} sx={{
                backgroundColor: "blue"
            }}>
                
            </Grid>
        </Grid>

    </section>
  )
}

export default Profile
