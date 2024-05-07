import React, { useEffect, useState } from 'react';
import './maintenance.css'; // Import your CSS file
import {CloudUploadOutlined, SearchOutlined} from '@mui/icons-material'

import {useSelector} from 'react-redux'
import { Box, Button, Grid, IconButton, InputBase, Table, TableCell, TableContainer, TableHead, TableRow ,Paper, TableBody } from '@mui/material';

import { getDownloadURL, getStorage, uploadBytesResumable,ref } from 'firebase/storage'
import app from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Header } from '../../components/dashboard/dashboardcomp';
import { tokens } from '../../utils/theme';
import { useTheme } from '@emotion/react';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function RadioInput({ icon, text, isChecked, handleChange }) {
  return (
    <label className="custom-radio">
      <input type="radio" name="radio" checked={isChecked} onChange={handleChange} />
      <span className="radio-btn">
        <i className="las la-check"></i>
        <div className="hobbies-icon">
          <i className={icon}></i>
          <h3>{text}</h3>
        </div>
      </span>
    </label>
  );
}

function MaintenanceForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [selectedOption, setSelectedOption] = useState('Appliances');
  const [requestText, setRequestText] = useState('');
  const [propertyData,setPropertyData] = useState({});

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextChange = (event) => {
    setRequestText(event.target.value);
  };
  const navigate = useNavigate()
  const [files,setFiles] = useState([]);
  const [fileURLs,setFileURLs] = useState([])

  const [open, setOpen] = React.useState(false);


  const [uploading,setUploading] = useState(false);
  const [error,setError] = useState(false);
  const [maintenanceReqs,setMaintenanceReqs] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setPropertyData(propertyData);
  
    const body = {
      tenantId: currentUser._id,
      tenantName: currentUser.username,
      // ownerId: propertyData[0].userRef,
      propertyId: propertyData[0]._id,
      propertyName: propertyData[0].name ,
      solved: false,
      message: requestText,
      images: fileURLs

    }


    const res = await fetch(`/api/request//maintenance/create`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await res.json();
    console.log(data);
  };

    const {currentUser} = useSelector(state => state.user)
      console.log(propertyData);
    


    
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
                    setFileURLs((prev) => {
                      return [...prev,...urls];
                    });
                })
                

                setOpen(false)

               
                
        }else {
            setOpen(false);
            setError("Please select atleast one image.");
        }

        
    }
    console.log(files);
    const handleRemoveImage = (index) => {
        setFileURLs(files.filter((url,ind) => {
                return ind != index;
            })
        )
    }

   


    useEffect(() => {
     
      const fetchPropertyDetails = async () => {
        try {
         
          const res = await fetch(`/api/request/getdetails/${currentUser._id}`,{
            method: 'GET'
          });
          
          const property = await res.json();
          setPropertyData(property)
          
          if(currentUser.role == 'tenant') {
            const result = await fetch(`/api/request/maintenance/user/get/${currentUser._id}`,{
              method: 'GET'
            });
  
            const requests = await result.json();
            setMaintenanceReqs(requests);
          }
          else {
              const result = await fetch(`/api/request/maintenance/owner/get/${currentUser._id}`,{
                method: 'GET'
              });
    
              const requests = await result.json();
              setMaintenanceReqs(requests);
          }
        }catch(err) {
          console.log(err);
        }
      }
      fetchPropertyDetails();
      

    },[]);
  return (
    <section className="main-wrapper" style={{paddingLeft: '2rem'}}>
        {currentUser.role == 'tenant' && (<Grid container >
          <Grid item xs={12} md={6}>
            <div className="main-container">
                  <h2>Describe the issue</h2>
                  <form>
                  <textarea name="text" className="request-input" placeholder="Type your request.." rows="20" cols="30" value={requestText} onChange={handleTextChange}>
                    
                  </textarea>
                  
                  <input type="submit" value="Request" onClick={handleSubmit} />
                  </form>
              </div>
          </Grid>
          <Grid item xs={12} md={6}
          
            sx={{
              display: "flex",
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'start',
              marginTop: '1rem'
              
            }}
          >
                <Box>
                  <div className="image--text">
                          <p><strong>Images</strong>:</p>
                          
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
                </Box>

                <Box 
                  
                >
                    {
                       
                        fileURLs.length > 0 && fileURLs.map((url,index) => {
                            return (<div className="image--item" key={index}>
                                <img src={url} alt="hii" style={{
                                height: "100px",
                                width:'100px'
                            }}/>

                            <Button variant='outlined' color='error' onClick={() => handleRemoveImage(index)}>Delete</Button>
                            
                            </div>)
                        })
                    }
                  </Box>
          </Grid>
        </Grid>)}
        <Box m='20px' sx={{height: "100vh"}}>
                <Header title="Maintenance requests" subtitle=""/>
                {/* <Box 
                    sx={{width:"14rem"}}
                    backgroundColor={colors.primary[400]}
                    borderRadius='3px'  
                >
                    <InputBase sx={{ml: 2,flex: 1}} placeholder='Search' onChange={handleSearchTermChange}/>
                    <IconButton type='button' sx={{p:1}}>
                    <SearchOutlined/>
                    </IconButton>
                </Box> */}
                  <Box m='40px 0 5rem 0' >
                      <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead
                                  sx={{
                                      backgroundColor:'#373A89'
                                  }}
                              >
                              <TableRow>
                                  <TableCell>ID</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Property Name</TableCell>
                                  <TableCell>Request</TableCell>
                                 
                              </TableRow>
                              </TableHead>
                              <TableBody>
                              
                              {maintenanceReqs.length > 0 ?maintenanceReqs.map((row,index) => {
                                
                                  return (
                                          <TableRow
                                          key={index}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                                  backgroundColor: colors.primary[400]
                                          }}
                                          >
                                          <TableCell align="left">{index + 1}</TableCell>
                                          {/* Name */}
                                          <TableCell component="th" scope="row">
                                              {row.tenantName}
                                          </TableCell>
                                          
                                          
                                          {/* <TableCell align="left">{ row.tenantEmail}</TableCell> */}
                                          <TableCell align="left">{row.propertyName}</TableCell>
                                          <TableCell align="leftt"><Button color='info' onClick={(e) => navigate(`/dashboard/maintenance-form/${row._id}`)}>View details</Button></TableCell>
                                          {/* <TableCell align="left">{row.status}</TableCell> */}
                                      </TableRow>
                                  )
                              }): ''}
                              </TableBody>
                          </Table>
                      </TableContainer>
                  </Box>
                </Box>
        
    </section>
  );
}

export default MaintenanceForm;
