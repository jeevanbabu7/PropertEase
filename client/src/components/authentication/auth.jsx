import React from 'react'
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import app from '../../firebase.js'

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleSubmit = async () => {
    try {

      const provider = new GoogleAuthProvider();
      // Get authentication instance
      const auth = getAuth(app);

      // Sign in with Google Popup
      const result = await signInWithPopup(auth, provider);

      // Send user data to backend
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL
        })
      });

      // Parse response data
      const data = await res.json();

      // Dispatch action to update user state
      dispatch(signInSuccess(data));
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (

    <Button 
      variant='outlined' 
      onClick={handleGoogleSubmit} 
      sx={{
        marginTop: -2
      }}
    >
      <GoogleIcon sx={{ marginRight: 2 }} onClick={handleGoogleSubmit} />
      Continue with Google
    </Button>
  )
}

export default Auth;
