import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { 
     TextField,
     FormControl,
     InputAdornment,
     InputLabel,
     OutlinedInput,
     IconButton,
     Button,
     Divider,
     Snackbar

} from '@mui/material'
import {
  Visibility ,
  VisibilityOff
}
from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice'
import validator from 'email-validator'
import Auth from './auth';
import './login.css'



const Login = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user)

  const [alertMsg, setAlertMsg] = useState({
    open: error,
    vertical: 'top',
    horizontal: 'center',
  });

  const {open,vertical,horizontal} = alertMsg;
  const handleClose = () => {
    setAlertMsg({ ...state, open: false });
  }

  const handleChange = (e) => {
    console.log(formData);
    setFormData((prevData) => {
      return {...prevData , [e.target.id]:e.target.value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!validator.validate(formData.email)) {
      dispatch(signInFailure("Invalid email address"))
      return
    }

    try {
     
      const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    
   

      dispatch(signInSuccess(data))
      navigate('/profile');
    }
    catch(err) {
      dispatch(signInFailure(err.message));
    }
  
  }
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const inputStyles = {
    width: "25rem"
  };

  return (
          <>
          <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          message={error}
          key={vertical + horizontal}
          onClose={handleClose}
        />
        <section className="flexColCenter sign-in">
            <form onSubmit={handleSubmit} >
              <div className="innerWidth paddings signin-container">
                <h2>Sign In</h2>
                <TextField 
                
                  label="Email" 
                  variant="outlined" 
                  id="email"
                  onChange={handleChange}
                  sx={inputStyles}
                />
              <FormControl sx={inputStyles} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                          id="password"
                          onChange={handleChange}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>

              <Button variant='contained' onClick={handleSubmit}>Sign in</Button>

              <Divider/>
                <Auth />
                <div className="c-log-in">
                <p>Don't have an account?</p>
                <Link to='/sign-up'>
                  <a  className="secondaryText ">Sign up</a>
                </Link>
              </div>
              </div>

            </form>
          </section>
          </>
  )
}

export default Login
