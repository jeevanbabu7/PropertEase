import React,{useState} from 'react'
import {Link,useNavigate, useParams} from 'react-router-dom'
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
import { signInFailure, signInStart, signInSuccess,clearError } from '../../redux/user/userSlice'
import validator from 'email-validator'
import Auth from './auth';
import './login.css'



const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const {loading,error} = useSelector((state) => state.user)
  const params = useParams()
  const [formData,setFormData] = useState({
    role: params.role 
  });

  const [alertMsg, setAlertMsg] = useState({
    open: error,
    vertical: 'top',
    horizontal: 'center',
  });

  const {open,vertical,horizontal} = alertMsg;
  const handleClose = () => {
    dispatch(clearError());
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

    if(!formData.password) {
      dispatch(signInFailure("Enter password"))
      return;
    }

    try {
     
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success == false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/dashboard');
    }
    catch(err) {
     
      dispatch(signInFailure(err.message));
    }
  
  }
  console.log(error);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const inputStyles = {
    width: "100%",
    maxWidth: "35rem"
  };

  return (
          <>
          <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={error}
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
                <Link to={`/sign-up/${params.role}`}>
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
