import { useSelector } from 'react-redux'
import { Box, Typography, ThemeProvider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Modal, Fade ,Backdrop} from '@mui/material'
import { useTheme } from '@emotion/react'

import { tokens } from '../../utils/theme.js'
import { mockDataTeam } from '../../data/mockData.js'
import {
    AdminPanelSettingsOutlined,
    LockOpenOutlined,
    SecurityOutlined
} from '@mui/icons-material'

import { Header } from '../../components/dashboard/dashboardcomp.jsx'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { setUserProperties } from 'firebase/analytics'



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

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
    const subtitle = currentUser.role === "admin" ? "Managing Users" : "Managing tenants";
    const title = currentUser.role === "admin" ? "Users" : "Tenants";

    // for modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [msg,setMsg] = useState(null);
    const [error,setError] = useState(false); 
    const [userData,setUserData] = useState([]);

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "accessLevel",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === "admin"
                                ? colors.greenAccent[600]
                                : access === "manager"
                                    ? colors.greenAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlined />}
                        {access === "manager" && <SecurityOutlined />}
                        {access === "user" && <LockOpenOutlined />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
                );
            },
        },
    ];
    const fetchRequests = async () => {
       
        const details = await fetch('/api/request/get',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: currentUser._id})
        });

        const data = await details.json();
        setUserData(data);

   
        
}

    const handleClick = async (e,propertyId) => {
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
                    body: JSON.stringify({occupied: true})
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
    return (
        <ThemeProvider theme={theme}>
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
                                <p>{msg}</p>    
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
      
            <Box m='20px' >
                <Header title={title} subtitle={title} />
                <Box m='40px 0 0 0' height="75vh">
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
                            {userData.length && userData.map((row,index) => {
                                
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
                                            <Box display='flex' flexDirection='column' gap={2}>
                                                <Button variant='contained' color='secondary' id={row._id} name='Accepted' onClick={(e) => handleClick(e,row.propertyId)}>Accept</Button>
                                                <Button name='Rejected' variant='contained' color='error' id={row._id} onClick={(e) => handleClick(e,row.propertyId)}>Reject</Button>
                                            </Box>
                                         </TableCell>
                                                                                
                                        
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </ThemeProvider>
        
    )
}

export default Lease;
