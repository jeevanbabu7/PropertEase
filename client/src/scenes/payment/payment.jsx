import { Table, TableContainer, TableHead, TableRow,Box,Paper,TableCell,TableBody, Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useTheme} from '@mui/material';
import { tokens } from '../../utils/theme.js';
import { Header } from '../../components/dashboard/dashboardcomp.jsx';

const Payment = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {currentUser} = useSelector(state => state.user)
    const [propertyData,setPropertyData] = useState([])
    const [paid,setPaid] = useState(false);

    const [paymentHistory,setPaymentHistory] = useState([]);
    
    const fetchPaymentHistory = async () => {
        try {
            const res = await fetch(`/api/payment/history/get/${currentUser._id}`,{
                method: 'GET'
            })
            const data = await res.json();
            setPaymentHistory(data)
        }
        catch(err) {
            console.log(err.message);
        }
    }
    const checkForPayment = async () => {
        const res = await fetch(`/api/payment/checkpayment/${currentUser._id}`,{
            method: 'GET'
        });
        const data = await res.json();
        console.log(data);
        setPaid(data)

    }

    const payRent = async() => {
        try {
            const res =await fetch(`/api/payment/pay`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tenantName: propertyData[0].tenantName,
                    tenantId: propertyData[0].tenantId,
                    ownerId: propertyData[0].userRef,
                    amount: propertyData[0].price,
                    propertyName: propertyData[0].name

                })

            });
            const data = await res.json();
            console.log(data); 
        }catch(err) {
            console.log(err.message);
        }
    }
  useEffect(() => {
    const fetchData = async () => {
        const res = await fetch(`/api/payment/getUserInfo/${currentUser._id}`,{
            method: 'GET'
        });
        const data = await res.json();
        console.log(data);
        setPropertyData(data)   
        console.log(data.length);
        if(data.length != 0) {
            checkForPayment()
        }
    }
   
    fetchData();
  },[]);  

  fetchPaymentHistory();
  return (
    <div>
        <Box m='40px 1rem 5rem 1rem' >
            <Header title='Payment'/>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead
                                sx={{
                                    backgroundColor:'#373A89'
                                }}
                            >
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Property Name</TableCell>
                                <TableCell align="left">Amount</TableCell>
                                <TableCell align="right"></TableCell>
                              
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {paid == true ? (<TableRow 
                                sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor: colors.primary[400],
                        }}
                                >
                                <TableCell>No dues</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                
                              
                                
                            </TableRow>) : (
                                    <TableRow 
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                    backgroundColor: colors.primary[400],
                            }}
                                    >
                                    <TableCell>{1}</TableCell>
                                    <TableCell>{propertyData.length && propertyData[0].name}</TableCell>
                                    <TableCell>{propertyData.length && propertyData[0].price} $</TableCell>
                                    <TableCell>
                                        <Button variant='contained' color='success' onClick={payRent}>Pay now</Button>
                                    </TableCell>
                                 
                                   
                                    
                                </TableRow>
                            )

                            } 
                           
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Header title="" subtitle="Payment history"/>
                <Box m='40px 1rem 0 1rem' sx={{paddingBottom: '3rem'}}>
                    <TableContainer component={Paper} sx={{overflow: 'auto'}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead
                                sx={{
                                    backgroundColor:'#373A89'
                                }}
                            >
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Property Name</TableCell>
                                <TableCell align="left">Amount</TableCell>
                                <TableCell align="left">Status</TableCell>
             
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {currentUser.role == 'tenant' && paymentHistory.length > 0 ? paymentHistory.map((row,index) => {
                               
                                return (
                                        <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                                backgroundColor: colors.primary[400]
                                        }}
                                        >
                                        <TableCell align="left">{index + 1}</TableCell>
                                         <TableCell align="left">{ row.propertyName}</TableCell>
                                        
                                         <TableCell align="left">{row.amount} $</TableCell>
                                         <TableCell align="left">Paid</TableCell>
                                         
                                         
                                                                                
                                        
                                    </TableRow>
                                )
                            }): ''}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
       
    </div>
  )
}

export default Payment
