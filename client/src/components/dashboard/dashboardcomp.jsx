import React, { useState } from 'react'
import { Typography, Box, useTheme,Button  } from "@mui/material";
import { tokens } from '../../utils/theme';
import { DownloadOutlined,EmailOutlined,PointOfSaleOutlined ,Person2Outlined,TrafficOutlined} from '@mui/icons-material';
import StatBox from './stat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const Header = ({title,subtitle}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
      <Box mb="30px">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
    )
}

const DashboardComp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {currentUser} = useSelector(state => state.user);
  const navigate = useNavigate()
    return  (

        <Box m="20px">
       
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
  
          {/* <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlined sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box> */}
        </Box>
  
   
        {currentUser.role == 'admin' && (<Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          
        >
          
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="12,361"
              subtitle="Emails Sent"
              progress="0.75"
              increase="+14%"
              icon={
                <EmailOutlined
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="431,225"
              subtitle="Sales Obtained"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleOutlined
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="32,441"
              subtitle="New Clients"
              progress="0.30"
              increase="+5%"
              icon={
                <Person2Outlined
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="1,325,134"
              subtitle="Traffic Received"
              progress="0.80"
              increase="+43%"
              icon={
                <TrafficOutlined
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
  
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Transactions
              </Typography>
            </Box>
            {/* {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))} */}
          </Box>
  
        </Box>)}


        {currentUser.role != 'admin' && (
          <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="200px"
          gap="240px"
          
        >
          
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection='column'
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <h2>User details</h2>
            <StatBox
              title={currentUser.username}
              subtitle={currentUser.email}
              progress="0.75"
              // increase="+14%"
     
            />
            <Button variant='contained' color='secondary' onClick={() => navigate('/profile')}>Edit profile</Button>
          </Box>
          </Box>
        )}
      </Box>
    )
}
export default DashboardComp
