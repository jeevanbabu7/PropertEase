    import React, { useEffect, useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { Grid } from '@mui/material'
    import {
        Box,
        TextField,
        Alert,    
        FormControl,
        InputAdornment,
        InputLabel,
        OutlinedInput,
        IconButton,
        Button,
        Divider
    } from '@mui/material'
    import {
        RestartAltSharp,
    Visibility ,
    VisibilityOff
    }
    from '@mui/icons-material'

    import { useRef } from 'react'
    import app from '../../firebase.js'
    import {getDownloadURL, getStorage,ref,uploadBytes,uploadBytesResumable} from 'firebase/storage'
    import {useSelector,useDispatch} from "react-redux"
    import { 
        updateUserStart,
        updateUserSuccess,
        updateUserFailure,
        deleteUserStart,
        deleteUserSuccess,
        deleteUserFailure,
        signOutUserStart,
        signOutUserFailure,
        signOutUserSuccess,
        signInFailure
     } from '../../redux/user/userSlice.js'
    import './profile.css'
    const Profile = () => { 
        const {currentUser, loading} = useSelector(state => state.user)
        const navigate = useNavigate();
        const dispatch = useDispatch();
        console.log(currentUser);

        const boxStyles = {
            width:"20rem"
        }

        // password Field
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        const [showPassword,setShowPassword] = useState(false);
        const handleClickShowPassword = (e) => setShowPassword(prevState => !prevState);

        const [userData,setuserData] = useState(currentUser);
        const fileRef = useRef(null);
        const [file,setFile] = useState(undefined)
        const [filePerc,setFilePerc] = useState(0) 
        const [fileUploadError,setFileUplodError] = useState(false) 

        // console.log(file);
        // profile photo handler

        const handleProfileUpload = (e) => {
            setFile((prevState) => e.target.files[0]);
        
        }

        const handleFileUpload = (file) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
        
            uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                setuserData({ ...userData, avatar: downloadURL })
                );
            }
            );
        }

        const handleChange = (e) => {
            setuserData(prevState => {
                return {...prevState , [e.target.id]: e.target.value};
                
            })
            console.log(userData);
            
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const res = await fetch(`/api/user/update/${currentUser._id}`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });
        
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await res.json();
                if (data.success === false) {
                    dispatch(updateUserFailure());
                    return;
                }
        
                dispatch(updateUserSuccess(data));
                
            } catch (err) {
                console.error('Error:', err);
            }
        };
        
       
        const handleDeleteUser = async (e) => {
            e.preventDefault();
            try {
                dispatch(deleteUserStart());
                const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                    method: 'DELETE',
                });

                const data = await res.json();
                if (data.success === false) {
                    dispatch(deleteUserFailure(data.message));
                    return;
                }
                dispatch(deleteUserSuccess(data));
                navigate('/')
                console.log("user deleted...");

            } catch (error) {
             dispatch(deleteUserFailure(error.message));
            }
            
        };

        const handleSignOUt = async (e) => {
            e.preventDefault();
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

        // whenever user upload new photo it will be updated in the firestore. 
        useEffect(() => {
            if(file) {
                handleFileUpload(file);
            }
        },[file]);



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
                            alignItems="center"
                            gap={2}
                            marginTop="2.5rem"
        
                        >   <input type="file" ref={fileRef} hidden accept='image/*' onClick={handleProfileUpload}/>
                            <img 
                                src={userData.avatar || "https://lh3.googleusercontent.com/a/ACg8ocJ5z5YTE6kYYfj21tJJo_hytISefYsDEMoXJ489Ru3u6pq65Q=s96-c"} alt="Profile" className='profile--img' onClick={(e) => fileRef.current.click()}/>

                            

                            <div className="userid--box">
                                <p>UserID : {userData.username}</p>
                                <p>Score : </p>
                            </div>
                        
                        </Box>
                        <p>{ fileUploadError ? (<span>Image upload error</span>
                            ):((filePerc > 0 && filePerc < 100) ? (
                                    <span>Uploading</span>
                                ): filePerc == 100 ? (
                                    <Alert severity="success">Profile photo updated successfully.</Alert>

                                ): ""
                            )}</p>
                        <TextField
                            id="username"
                            label="Name"
                            defaultValue={userData.username}
                            sx={boxStyles}
                            onChange={handleChange}
                            />
                        <TextField
                            id="email"
                            label="Email"
                            defaultValue={userData.email}
                            sx={boxStyles}
                            onChange={handleChange}
                            
                        />

                        <FormControl variant="outlined" sx={boxStyles}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                            id="password"
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            defaultValue={userData.password}
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

                            
                                <Button 
                                    variant='contained' color="success" sx={{
                                    ...boxStyles,
                                    
                                    }}
                                    
                                    onClick={handleSubmit}
                        
                                >{loading ? 'loading..': "UPDATE"}</Button>
                            
                        <Box 
                            sx={{
                                ...boxStyles
                            }}

                            display="flex"
                            justifyContent="space-between"
                        >
                            <a href="/" onClick={handleDeleteUser}>
                            <p className='text--danger'>Delete Account</p>
                            </a>
                            <a href="" onClick={handleSignOUt}><p className='text--danger'>Log Out</p></a>
                        </Box>
                        </Box>
                    {/* <Divider orientation='vertical' textAlign='left' sx={{
                        position: 'absolute' , 
                        left: "30rem",
                        top: '0'
                    }}/> */}
                </Grid>
                <Grid item xs={12} md={7} sx={{
                }}>
                    
                </Grid>
            </Grid>

        </section>
    )
    }

    export default Profile
