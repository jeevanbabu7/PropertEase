import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import {Box,TextField,Button,Alert} from '@mui/material'
import { useRef } from 'react'
import app from '../../firebase.js'
import {getDownloadURL, getStorage,ref,uploadBytes,uploadBytesResumable} from 'firebase/storage'
import './profile.css'
const Profile = () => {
    const boxStyles = {
        width:"20rem"
    }

    const [userData,setUserDate] = useState({
        username: "",
        email: "",
        
    });

    const [formData,setFormData] = useState({
        name: "Full Name",
        email: "Email",
        password: "Password"
    });
    const fileRef = useRef(null);
    const [file,setFile] = useState(undefined)
    const [filePerc,setFilePerc] = useState(0) 
    const [fileUploadError,setFileUplodError] = useState(false) 

    console.log(file);
    // profile photo handler

    const handleProfileUpload = (e) => {
        setFile((prevState) => e.target.files[0]);
       
    }

    const handleFileUpload = (file) => {
        const storage = getStorage(app) // create a storage for firebase app
        const fileName = new Date().getTime() +  file.name; // handling the case when files have same name by adding current time in front of file name

        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef,file)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress)); 
            console.log(filePerc);
        },
        (error) => {
            setFileUplodError(prevState => true);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setFormData({...FormData,avatar: downloadURL})
                console.log(formData);
            });
        }
        
        );
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
                            src={formData.avatar || "https://lh3.googleusercontent.com/a/ACg8ocJ5z5YTE6kYYfj21tJJo_hytISefYsDEMoXJ489Ru3u6pq65Q=s96-c"} alt="Profile" className='profile--img' onClick={(e) => fileRef.current.click()}/>

                        

                        <div className="userid--box">
                            <p>UserID : </p>
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
