import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress,Backdrop } from '@mui/material';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useSelector} from "react-redux"

import {

    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  
} from 'react-icons/fa';
import 'swiper/css/bundle'
import './property.css'



const Property = () => {
    SwiperCore.use([Navigation])
    const {id} = useParams();
    const [error,setError] = useState(false);
    const [propertyDetails,setPropertyDetails] = useState(null);
    const [loading,setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const { currentUser } = useSelector((state) => state.user);

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
                    <div className='fixed-share-button'>
                        <FaShare
                        className='text-slate-500'
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                            setCopied(false);
                            }, 2000);
                        }}
                        />
                    </div>
                    {copied && (
                        <p className='copied-message'>
                        Link copied!
                        </p>
                    )}
                    
                    <div className='listing-details'>
                        <p className='listing-price'>
                        {propertyDetails.name} - ${propertyDetails.offer ? propertyDetails.discountPrice.toLocaleString('en-US') : propertyDetails.regularPrice.toLocaleString('en-US')}
                        {propertyDetails.type === 'rent' && ' / month'}
                        </p>
                        <p className='listing-address'>
                            
                        <FaMapMarkerAlt className='text-green-700' />
                    
                        {propertyDetails.address}
                        </p>
                        <div className='flex gap-4'>
                        <p className={`listing-type-badge ${propertyDetails.type === 'rent' ? 'bg-red-900' : 'bg-green-900'}`}>
                            {propertyDetails.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </p>
            
                        </div>
                        <p className='listing-description'>
                        <span className='font-semibold text-black'><strong>Description</strong> - </span>
                        {propertyDetails.description}
                        </p>
                        <ul className='listing-features'>
                            <li>
                                <FaBed className='text-lg' />
                                {propertyDetails.bedrooms > 1 ? `${propertyDetails.bedrooms} beds ` : `${propertyDetails.bedrooms} bed `}
                            </li>
                            <li>
                                <FaBath className='text-lg' />
                                {propertyDetails.bathrooms > 1 ? `${propertyDetails.bathrooms} baths ` : `${propertyDetails.bathrooms} bath `}
                            </li>
                            <li>
                                <FaParking className='text-lg' />
                                {propertyDetails.parking ? 'Parking spot' : 'No Parking'}
                            </li>
                            <li>
                                <FaChair className='text-lg' />
                                {propertyDetails.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                        </ul>
                        {currentUser &&  (
                        <button
                            onClick={() => setContact(true)}
                            className='listing-contact-button'
                        >
                            Contact landlord
                        </button>
                        )}
                    </div>
                </>
                
            )


            }
        </section>
  )
}

export default Property
