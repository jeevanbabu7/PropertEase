import { useSelector } from 'react-redux'
import { Box, Typography, ThemeProvider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Modal, Fade ,Backdrop, InputBase, IconButton} from '@mui/material'
import { useTheme } from '@emotion/react'

import { tokens } from '../../utils/theme.js'
import { mockDataTeam } from '../../data/mockData.js'
import {
    AdminPanelSettingsOutlined,
    LockOpenOutlined,
    SearchOutlined,
    SecurityOutlined
} from '@mui/icons-material'

import { Header } from '../../components/dashboard/dashboardcomp.jsx'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { setUserProperties } from 'firebase/analytics'


// style for modal................
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };





const Lease = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { currentUser } = useSelector(state => state.user);
 

    // for modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [msg,setMsg] = useState(null);
    const [error,setError] = useState(false); 
    const [leaseRequests,setLeaseRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    
    
    console.log(leaseRequests);
    const fetchRequests = async () => {
        
        let query = {
            ownerId: currentUser._id
        }
        if(currentUser.role == 'tenant') {
          query = {
            tenantId: currentUser._id
          }  
        }

        const details = await fetch('/api/request/get',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        });

        const data = await details.json();
        setLeaseRequests(data);

   
        
}

    const handleClick = async (e,propertyId,tenantId,tenantName) => {
        const {id,name} = e.target;
        console.log(name);
      
        try {
            const result = await fetch(`/api/request/service/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({status: e.target.name})
            });
            fetchRequests();
            console.log(result.json());
            

            // if accepted then set occupied = true for that property
            if(name === "Accepted") {
                const accept = await fetch(`/api/listing/update/${propertyId}`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        occupied: true,
                        tenantName,
                        tenantId
                    })
                });

                console.log(accept.json())
            }
            
        }
        catch(err) {
            setError(err.message)
        }
    }

    const handleViewMessage = (e,msg) => {
        setMsg(msg);
     
        setOpen(true)
    }

    useEffect(() => {
        fetchRequests();
    },[]);

    const role = currentUser.role;
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }
    const filteredLeaseRequests = leaseRequests.filter(request => request.propertyName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <ThemeProvider theme={theme}>

            {/* // view message */}
            <div>
                
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Request Details
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: msg }}>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            </div>
      
            <Box m='20px' sx={{height: "100vh"}}>
                <Header title="Lease requests" subtitle="New Requests"/>
                <Box 
                    sx={{width:"14rem"}}
                    backgroundColor={colors.primary[400]}
                    borderRadius='3px'  
                >
                    <InputBase sx={{ml: 2,flex: 1}} placeholder='Search' onChange={handleSearchTermChange}/>
                    <IconButton type='button' sx={{p:1}}>
                    <SearchOutlined/>
                    </IconButton>
                </Box>
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
                                <TableCell align="left">Email</TableCell>
                                {role == 'admin' ? <TableCell align="left">Access Level</TableCell> : <TableCell align="center">Property Name</TableCell>}
                                <TableCell align="center">Request</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {leaseRequests.filter((item) => item.status === 'pending').length == 0  && <TableRow 
                                sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor: colors.primary[400],
                        }}
                            ><TableCell>No new requests</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                                
                            </TableRow>

                            } 
                            {filteredLeaseRequests.length > 0 ?  filteredLeaseRequests.filter(item => item.status == 'pending').map((row,index) => {
                               
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
                                        
                                        
                                         <TableCell align="left">{ row.tenantEmail}</TableCell>

                                         <TableCell align="center">{row.propertyName}</TableCell>
                                         <TableCell align="center"><Button color='info' onClick={(e) => handleViewMessage(e,row.message)}>View Message</Button></TableCell>
                                         <TableCell align="left">{row.status}</TableCell>
                                         <TableCell align="left">
                                            {role == 'owner' && (<Box display='flex' flexDirection='column' gap={2}>
                                                <Button variant='contained' color='secondary' id={row._id} name='Accepted' onClick={(e) => handleClick(e,row.propertyId,row.tenantId,row.tenantName)}>Accept</Button>
                                                <Button name='Rejected' variant='contained' color='error' id={row._id} onClick={(e) => handleClick(e,row.propertyId)}>Reject</Button>
                                            </Box>)}
                                         </TableCell>
                                    </TableRow>
                                )
                            }): ''}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Header title="" subtitle="Request history"/>
                <Box m='40px 0 0 0' sx={{paddingBottom: '3rem'}}>
                    <TableContainer component={Paper} sx={{overflow: 'auto'}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead
                                sx={{
                                    backgroundColor:'#373A89'
                                }}
                            >
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                {role == 'admin' ? <TableCell align="left">Access Level</TableCell> : <TableCell align="center">Property Name</TableCell>}
                                <TableCell align="center">Request</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredLeaseRequests.length > 0 ? filteredLeaseRequests.filter(item => item.status != 'pending').map((row,index) => {
                               
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
                                        
                                        
                                         <TableCell align="left">{ row.tenantEmail}</TableCell>

                                         <TableCell align="center">{row.propertyName}</TableCell>
                                         <TableCell align="center"><Button color='info' onClick={(e) => handleViewMessage(e,row.message)}>View Message</Button></TableCell>
                                         <TableCell align="left">{row.status}</TableCell>
                                         
                                         <TableCell align="left">
                                            {/* {currentUser.role == 'owner' && (<Box display='flex' flexDirection='column' gap={2}>
                                                <Button variant='contained' color='secondary' id={row._id} name='Accepted' onClick={(e) => handleClick(e,row.propertyId)}>Accept</Button>
                                                <Button name='Rejected' variant='contained' color='error' id={row._id} onClick={(e) => handleClick(e,row.propertyId)}>Reject</Button>
                                            </Box>)} */}
                                         </TableCell>
                                                                                
                                        
                                    </TableRow>
                                )
                            }): ''}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>  
            </Box>
        </ThemeProvider>
        
    )
}

export default Lease;

