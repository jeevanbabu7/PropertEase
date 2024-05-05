import React, { useState } from 'react'
import {HiLocationMarker} from 'react-icons/hi'
import { ImSearch } from "react-icons/im";
import CountUp from "react-countup"
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom';
import './main.css'
import '../../index.css'
const Main = () => {
    const navigate = useNavigate();
    const [searchTerm,setSearchTerm] = useState('');
    const handleSearch = (e) => {
       
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/properties/search?${searchQuery}`);
    }
  return (
    <div>
      <section className="hero-wrapper">
        <div className="paddings  innerWidth flexCenter hero-container">
                <div className="hero-left">
                    <div className="hero-title">
                        <motion.h1 
                            initial={{y: "2rem", opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{
                                duration: 2,
                                type: "spring"
                            }}
                        >Discover <br/>more suitable <br/>property</motion.h1>
                    </div>

                    <div className="hero-desc">
                        <span>Find a variety of Houses.</span>
                        <span>Forget all the difficulties</span>
                    </div>

                    <div className="search-bar">
                        <HiLocationMarker color="var(--blue)" size={25}/>
                        <input placeholder='Location' type="text" onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}/>
                        <button onClick={handleSearch}  className=" search-btn"><ImSearch color=''/></button>
                    </div>

                    <div className="stats">
                        <div className="flexColStart stat">
                            <span>
                                <CountUp start={8000} end={9000} duration={2.5}/>
                                <span>+</span>
                            </span>
                            <span>Homes</span>
                        </div>

                        <div className="flexColStart stat">
                            <span>
                                <CountUp start={1950} end={3000} duration={2.5}/>
                                <span>+</span>
                            </span>
                            <span>Happy customers</span>
                        </div>

                        <div className="flexColStart stat">
                            <span>
                                <CountUp end={20}/>
                                <span>+</span>
                            </span>
                            <span>Award winnings</span>
                        </div>
                    </div>
                </div>

                {/* <div className="flexCenter hero-right">
                    <motion.div 
                        className="image-container"
                        initial={{x:"7rem", opacity:0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{
                            duration: 1.5 ,
                            type: "spring"
                        }}
                    >
                        <img src="./hero-image.png" alt="" />
                    </motion.div>
                </div> */}
            </div>
        </section>
    </div>
  )
}

export default Main
