import React, { useState } from "react"
import { Link,useNavigate, useParams } from "react-router-dom"
import { 
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Button,
  Box,
  Checkbox

} from '@mui/material'
import {
  RestartAltSharp,
Visibility ,
VisibilityOff
}
from '@mui/icons-material'
import Auth from "./auth"
import validator from 'email-validator'
import './signup.css'



const SignUp = () => {

  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const [error, setError] = useState(null);
  const params = useParams();
  const handleChange = (e) => {
    console.log(formData);
    setFormData((prevData) => {
      return {...prevData , [e.target.id]: e.target.value }
    })
  }

  

  const handleSubmit = async (e) => {
    // e.preventDefault()
    const userRole = params.role;
    const {password2,...rest} = formData;
    if(!validator.validate(formData.email)) {
      setError("Invalid email address")
      return
    }
    if(formData.password != formData.password2) {
      alert("Password do not match...");
      return;
    }

    console.log("mm",userRole);


    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...rest,role:userRole})
      });
      const data = await res.json();
      // if (data.success === false) {
      //   setError(data.message);
      //   return;
      // }

      setError(null);
      navigate(`/sign-in/${params.role}`);
    }
    catch(err) {
      console.log(err);
      setError(err.message)
    }
  
  }

  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);


  const handleClickShowPassword = (e) => setShowPassword(prevState => !prevState);
  const handleClickShowConfirmPassword = (e) => setShowConfirmPassword(prevState => !prevState);


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <section className="flexColCenter sign-up">
      <form>
        <div className="innerWidth paddings signup-container">
          <h2>Sign Up</h2>
          <Box 
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem"
            }}
          >
            <TextField 
                  
                  label="Name" 
                  variant="outlined" 
                  id="username"
                  onChange={handleChange}
                  sx={{
                    width: "50%"
                  }}
                  
              />
            <TextField 
                  
                  label="Email" 
                  variant="outlined" 
                  id="email"
                  onChange={handleChange}
                  sx={{
                    width: "50%"
                  }}
                  
              />
          </Box>
        <FormControl variant="outlined">
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
        <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                          id="password2"
                          onChange={handleChange}
                          type={showConfirmPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Confirm Password"
                        />
        </FormControl>
 
        <Button variant="contained" onClick={handleSubmit}>Sign up</Button>
        <Auth />

        <div className="c-log-in">
        <p>Have an account?</p>
        <Link to={`/sign-in/${params.role}`}>
          <span className="secondaryText ">Sign in</span>
        </Link>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>

        </div>
        
      </form>

    </section>
  )
}

export default SignUp

