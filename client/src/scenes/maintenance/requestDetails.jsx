import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const RequestDetails = () => {
    
    const [request,setRequest] = useState([])
    const params = useParams()
    const requestID = params.requestId;

    

    useEffect(() => {
        
        const fetchRequestDetails = async () => {

            const res = await fetch(`/api/request/maintenance/get/${requestID}`,{
                method: 'GET'
            });
            const data = await res.json();
            setRequest(data)
        }
        fetchRequestDetails()

    },[])
    return (
    <Box
        marginLeft='2rem'
        display='flex'
        flexDirection='column'
    >
            {request.length != 0 && (
                <div>
                    <h2>Message Details</h2>
                    <p>Message: {request.message}</p>
                    <p>Property Name: {request.propertyName}</p>
                    <p>Tenant Name: {request.tenantName}</p>
                    <p>Images: {request.images.length > 0 ? request.images.map((image, index) => <img key={index} src={image} alt={`Image ${index}`} />) : 'No images'}</p>
                </div>
            )}
    </Box>
  )
}

export default RequestDetails
