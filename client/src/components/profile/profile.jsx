import React, { useState } from 'react'
import { Grid } from '@mui/material'
import {Box,TextField,Button} from '@mui/material'

import './profile.css'
const Profile = () => {
    const boxStyles = {
        width:"20rem"
    }

    const [userData,setUserDate] = useState({
        username: "",
        email: "",
        
    });

  return (
    <section className="profile-container">
            
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
                <Box
                    display="flex"
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    gap={3}
                >
                    <Box
                        width="18rem"
                        display={"flex"}
                        justifyContent="center"
                        gap={2}
                        marginTop="2.5rem"
     
                    >
                        <img src="https://lh3.googleusercontent.com/a/ACg8ocJ5z5YTE6kYYfj21tJJo_hytISefYsDEMoXJ489Ru3u6pq65Q=s96-c" alt="Profile" className='profile--img'/>

                        <div className="userid--box">
                            <p>UserID : </p>
                            <p>Score : </p>
                        </div>
                    
                    </Box>
                    <TextField
                        id="outlined-required"
                        label="Name"
                        defaultValue="Full Name"
                        sx={boxStyles}
                        />
                    <TextField
                        id="outlined-required"
                        label="Email"
                        defaultValue="Email"
                        sx={boxStyles}
                    />

                    <TextField
                        id="outlined-required"
                        label="Password"
                        defaultValue="Password"
                        sx={boxStyles}
                    />

                        <Button variant='contained' color="success" sx={{
                            ...boxStyles,
                            
                        }}>UPDATE</Button>
                    <Box 
                        sx={{
                            ...boxStyles
                        }}

                        display="flex"
                        justifyContent="space-between"
                    >
                        <a href="">
                        <p className='text--danger'>Delete Account</p>
                        </a>
                        <a href=""><p className='text--danger'>Log Out</p></a>
                    </Box>
                    </Box>

            </Grid>
            <Grid item xs={12} md={7} sx={{
            }}>
                
            </Grid>
        </Grid>

    </section>
  )
}

export default Profile
