import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Grid, TextField,Box,Checkbox,FormControlLabel,Button,Backdrop,CircularProgress} from '@mui/material'
import './PropertyForm.css'
import { getDownloadURL, getStorage, uploadBytesResumable,ref } from 'firebase/storage'

import app from '../../firebase.js'
import { useSelector } from 'react-redux'
const PropertyForm = () => {
    const {currentUser} = useSelector(state => state.user);
    const inputStyles = {
        width:'23rem',
        maxWidth: '35rem',
        minWidth: '15rem'
    }

    const navigate = useNavigate()
    const [files,setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        price: 0,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false 
    });

    const [open, setOpen] = React.useState(false);


    const [uploading,setUploading] = useState(false);
    const [error,setError] = useState(false);
            
    console.log(formData);
    const storeImage = async (file) => {
        return new Promise((resolve ,reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,file)
            
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                    
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL)
                        resolve(downloadURL)
                    });
                }
            )
        })
    }

    const handleImageSubmit = (e) => {
        
        
        if(files.length > 0 && files.length < 7) {
               
                setOpen(true);
                const promises = [];
                for(let i = 0;i<files.length ;++i) {
                    promises.push(storeImage(files[i]));
                }
                Promise.all(promises).then(urls => {
                    setOpen(false)
                    setFormData({...formData,
                        imageUrls: [...formData.imageUrls,...urls]
                    })
                    console.log(formData)
                })

                setOpen(false)

               
                
        }else {
            setOpen(false);
            setError("Please select atleast one image.");
        }

        
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((url,ind) => {
                return ind != index;
            })
        })
    }

    const handleChange = (e) => {

        const {id , value} = e.target;
        if(id == "parking" || id == 'furnished' || id == 'offer') {
            setFormData((prevData) => {
                return {...prevData , [id]: e.target.checked};
            })
        }
        else {
            setFormData((prevData) => {

                return {...prevData , [id]: value};
            })
        }
    }

    const handleSubmit = async (e) => {

        try {
            setOpen(true)
            const res = await fetch('/api/listing/create',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                    
                })
            })
            
            const data = await res.json();
            if(data.success == false) {
                setError("Error in creating property");
                return;
            }
            setOpen(false)
            setError(false);
            navigate(`/properties/${data._id}`)
        }catch(err) {
            setError("Error in adding new property");
        }
    }
    
    useEffect(() => {
        console.log(files);
    },[files]);

    console.log(open)

    return (
    <section className="property-form">
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <h1>New property</h1>
        <Grid container spacing={2} sx={{
            marginTop: "2rem"
        }}>
            <Grid item xs={12} md={6} 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap:"1.6rem",
                    width: '100%',

                }}
            >
                <div className="property-left-container"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap:"1.6rem",
                        width:"25rem"
    
                    }}
                >
                    <TextField 
                        label="Name"
                        id="name"
                        variant='filled'
                        sx={inputStyles}
                        onChange={handleChange}
                        value={formData.name}
                    />

                    <TextField
                        label='Description'
                        id='description'
                        multiline
                        variant='filled'
                        rows={4}
                        sx={inputStyles}
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <TextField 
                        label="Address"
                        id='address'
                        variant='filled'
                        sx={inputStyles}
                        onChange={handleChange}
                        value={formData.address}
                    />

                    <Box
                        sx={{
                          
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'start'
                        }}
                    >
                        <div>
                            {/* <FormControlLabel  required control={<Checkbox onChange={handleChange} checked={formData.sell}/>} label="sell" /> */}
                            {/* <FormControlLabel  required control={<Checkbox onChange={handleChange} checked={formData.type == 'rent'}/>} label="Rent" /> */}
                            <FormControlLabel  required  control={<Checkbox onChange={handleChange} checked={formData.parking == 'parking'} id="parking"/>} label="Parking Spot" />
                            <FormControlLabel  required  control={<Checkbox id='furnished' onChange={handleChange} checked={formData.furnished}/>} label="Furnished" />
                            <FormControlLabel  required  control={<Checkbox id='offer' onChange={handleChange} checked={formData.offer}/>} label="Offer" />
                        </div>
                        <div className='room-details' >
                            <div className="input--item">
                                <input type="number" id='bedrooms' required  defaultValue={0}
                                
                                onChange={handleChange}
                                value={formData.bedrooms}
                                />
                                <label htmlFor="bedrooms" >Beds</label>
                            </div>
                            <div className="input--item">
                                <input type="number" id='bathrooms' required  
                                onChange={handleChange}
                                value={formData.bathrooms}
                                />
                                <label htmlFor="bathrooms" >Baths</label>
                            </div>
                        </div>
                        <div className="input--item  input--item--price">
                                <input type="number" id='price' required  
                                onChange={handleChange}
                                value={formData.regularPrice}
                                />
                                <label htmlFor="price" >Price ($ / month)</label>
                        </div>

                    </Box>
                </div>
                
            </Grid>
            <Grid item xs={12} md={6}>
                <div className="image--text">
                        <p><strong>Images</strong>:</p>
                        <span>The first image will be the cover (max 6)</span>
                </div>
                <div className="image--input">
                <input 
                    type="file"      
                    id='images' 
                    accept='images/*' 
                    multiple
                    onChange={(e) => {
                        
                        setFiles(e.target.files);  // Update files with selected files
                        
                    }}
                />

                    <Button 
                        variant='contained'
                        color='secondary'
                        onClick={(e) => {
                            
                            handleImageSubmit(e)
                            .then(() => setOpen(false)) 
                            .catch(() => setOpen(false)); 
                            
                        }}
                        disabled={uploading}
                    >{uploading ? "Uploading..":"Upload"}</Button>
                </div>

                {/* <div className="image--container"> */}
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => {
                            return (<div className="image--item" key={index}>
                                <img src={url} alt="hii" style={{
                                height: "100px",
                                width:'100px'
                            }}/>

                            <Button variant='outlined' color='error' onClick={() => handleRemoveImage(index)}>Delete</Button>
                            
                            </div>)
                        })
                    }
                {/* </div> */}

                <Button 
                    variant='contained'
                    color='primary'
                    sx={{
                        width: '25rem',
                        marginTop: "2rem"
                    }}

                    onClick={handleSubmit}
                >Create listing</Button>
            </Grid>
        </Grid>
    </section>
  );
}

export default PropertyForm
