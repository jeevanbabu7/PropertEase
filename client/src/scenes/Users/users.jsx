import { useSelector } from 'react-redux'
import { Box, Typography, ThemeProvider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material'
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






const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { currentUser } = useSelector(state => state.user);
    const subtitle = currentUser.role === "admin" ? "Managing Users" : "Managing tenants";
    const title = currentUser.role === "admin" ? "Users" : "Tenants";

    const [userData,setUserData] = useState([]);

    const fetchUser = async () => {
        console.log(currentUser._id);
        const details = await fetch('/api/request/getTenants',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: currentUser._id})
        });

        const data = await details.json();
        setUserData(data);
        console.log(data);
   
        
}
    const handleRemoveUser = async (e) => {
        const id = e.target.id;
        const res = await fetch(`/api/user/delete/${id}`,{
            method: 'DELETE'
        });
        console.log(res.json());
        fetchUser()
    }

    useEffect(() => {
        fetchUser();
    },[]);

    const role = currentUser.role;
    return (
        <ThemeProvider theme={theme}>
      
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
                                {role == 'admin' ? <TableCell align="left">Access Level</TableCell> : <TableCell align="left">Property Name</TableCell>}
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
                                            {currentUser.role == "admin" ? row.username: row.tenantName}
                                        </TableCell>
                                        
                                        
                                         <TableCell align="left">{role == 'admin' ? row.email : row.tenantEmail}</TableCell>

                                         <TableCell align="left">{role == 'admin' ? row.role : row.name}</TableCell>
                                                                                
                                        {role == 'admin'? <TableCell align="right">{<Button id={row._id} variant='contained' color='error'
                                            onClick={handleRemoveUser}
                                        >Remove</Button>}</TableCell> : <TableCell align="left"></TableCell>}
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

export default Users;
