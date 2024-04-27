import React from 'react'
import { Grid, TextField,Box,Checkbox,FormControlLabel,Button} from '@mui/material'
import './PropertyForm.css'


const PropertyForm = () => {

    const inputStyles = {
        width:'23rem',
        maxWidth: '35rem',
        minWidth: '15rem'
    }

  return (
    <section className="property-form">
        <h1>New property</h1>
        <Grid container spacing={2}>
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
                    <input type="file" id='images' accept='images/*' multiple/>

                    <Button 
                        variant='contained'
                        color='secondary'
                    >Upload</Button>
                </div>

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
