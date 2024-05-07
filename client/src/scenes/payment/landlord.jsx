import { Table, TableContainer, TableHead, TableRow,Box,Paper,TableCell,TableBody, Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useTheme} from '@mui/material';
import { tokens } from '../../utils/theme.js';
import { Header } from '../../components/dashboard/dashboardcomp.jsx';

const LandLordPayment = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {currentUser} = useSelector(state => state.user)
    const [propertyData,setPropertyData] = useState([])
    const [paid,setPaid] = useState(false);

    const [paymentHistory,setPaymentHistory] = useState([]);
    


   
  useEffect(() => {
    const fetchPaymentHistory = async () => {
        try {
            const res = await fetch(`/api/payment/owner/history/get/${currentUser._id}`,{
                method: 'GET'
            })
            const data = await res.json();
            setPaymentHistory(data)
            console.log(data);
        }
        catch(err) {
            console.log(err.message);
        }
    }

    fetchPaymentHistory();

  },[]);  


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
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="right"></TableCell>
                              
                            </TableRow>
                            </TableHead>
                            <TableBody>

                            {paymentHistory.length && paymentHistory.map((row,index) => {
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
                                         <TableCell align="left">{row.paymentDate.slice(2,10)}</TableCell>
                                         <TableCell align="left">Paid</TableCell>
                                    </TableRow>
                                )
                            })}

                            
                           
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                
                
       
    </div>
  )
}

export default LandLordPayment


