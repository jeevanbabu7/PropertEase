import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress,Backdrop } from '@mui/material';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/bundle'
import './property.css'



const Property = () => {
    SwiperCore.use([Navigation])
    const {id} = useParams();
    const [error,setError] = useState(false);
    const [propertyDetails,setPropertyDetails] = useState(null);
    const [loading,setLoading] = useState(false);
    
    const fetchPropertyDetails = async () => {

        try {
            
            const res = await fetch(`/api/listing/property/${id}`,{
                method: 'GET'
            });
            const data = await res.json();
            if(data.success == false) {
                setError(true);
                return
            }

            setPropertyDetails(data);
        }catch(err) {
            setError(true);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchPropertyDetails();
        setTimeout(() => {
            setLoading(false);
        },1000);

    },[id]);
    return (
        <section className='p-container'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
           
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        
            <h3>{error && "Something went wrong :("}</h3>
      
            {propertyDetails && (

                <>
                    <Swiper navigation>
                        {
                            propertyDetails.imageUrls.map((url,index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div style={{
                                            background: `url(${url}) center no-repeat`,
                                            backgroundSize: 'cover',
                                            width:"100%",
                                            height: "18rem",

                                        }}>

                                        </div>
                                    </SwiperSlide>
                                    
                                )
                            })
                        }
                    </Swiper>
                </>
            )


            }
          
        </section>
  )
}

export default Property
