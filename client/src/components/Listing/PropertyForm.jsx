import React, { useEffect, useState } from 'react'
import { Grid, TextField,Box,Checkbox,FormControlLabel,Button} from '@mui/material'
import './PropertyForm.css'
import { getDownloadURL, getStorage, uploadBytesResumable,ref } from 'firebase/storage'

import app from '../../firebase.js'
const PropertyForm = () => {

    const inputStyles = {
        width:'23rem',
        maxWidth: '35rem',
        minWidth: '15rem'
    }

    const [files,setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1.
        bathrooms: 1,
        regular


    })
    const [uploading,setUploading] = useState(false);

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
                setUploading(true);
                const promises = [];
                for(let i = 0;i<files.length ;++i) {
                    promises.push(storeImage(files[i]));
                }
                Promise.all(promises).then(urls => {
                    console.log(urls);
                    setFormData({...formData,imageUrls: urls })
                })

                setUploading(false);
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

    useEffect(() => {
        console.log(files);
    },[files]);
    return (
    <section className="property-form">
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
                        variant='filled'
                        sx={inputStyles}
                    />

                    <TextField
                        label='Description'
                        multiline
                        variant='filled'
                        rows={4}
                        sx={inputStyles}
                    />
                    <TextField 
                        label="Address"
                        variant='filled'
                        sx={inputStyles}
                    />

                    <Box
                        sx={{
                          
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'start'
                        }}
                    >
                        <div>
                            <FormControlLabel  required control={<Checkbox />} label="Sell" />
                            <FormControlLabel  required control={<Checkbox />} label="Rent" />
                            <FormControlLabel  required  control={<Checkbox />} label="Parking Spot" />
                            <FormControlLabel  required  control={<Checkbox />} label="Furnshed" />
                            <FormControlLabel  required  control={<Checkbox />} label="Offer" />
                        </div>
                        <div className='room-details' >
                            <div className="input--item">
                                <input type="number" id='beds' required  defaultValue={0}/>
                                <label htmlFor="beds" >Beds</label>
                            </div>
                            <div className="input--item">
                                <input type="number" id='baths' required  defaultValue={0}/>
                                <label htmlFor="baths" >Baths</label>
                            </div>
                        </div>
                        <div className="input--item  input--item--price">
                                <input type="number" id='price' required  defaultValue={0}/>
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
                        onClick={handleImageSubmit}
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
                >Create listing</Button>
            </Grid>
        </Grid>
    </section>
  );
}

export default PropertyForm
