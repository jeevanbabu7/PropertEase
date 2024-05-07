import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Vacate = () => {
    const navigate = useNavigate()
    const [propertyData,setPropertyData] = useState({});
    console.log(propertyData);
    const vacateProperty = async () => {
        try {
            const res = fetch(`/api/listing/update/${propertyData._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({tenantId: "none",tenantName: 'none',occupied: 'false'})
            });
            
           
            // console.log(data);
            navigate('/profile');
            alert("Vacated successfully")
        }catch(err) {
            console.log(err);
        }
    }
    const {currentUser} = useSelector(state => state.user)

    useEffect(() => {
     
        const fetchPropertyDetails = async () => {
          try {
           
            const res = await fetch(`/api/request/getdetails/${currentUser._id}`,{
              method: 'GET'
            });
            
            const property = await res.json();
            setPropertyData(property)
            console.log(propertyData);
           
          }catch(err) {
            console.log(err);
          }
        }
        fetchPropertyDetails();
        
  
      },[]);


  return (
    <div>
        
      <Box

      >
        <Button variant='contained' color='secondary' onClick={vacateProperty}>Vacate</Button>
      </Box>
    </div>
  )
}

export default Vacate
