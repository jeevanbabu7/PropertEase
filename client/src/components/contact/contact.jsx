import React from 'react'
import './contact.css'

import { MdCall } from 'react-icons/md';
import { BsFillChatDotsFill } from 'react-icons/bs'
// import {HichatBubbleBottomCenter} from "react-icons/hi"
const Contact = () => {
  return (
    <section className="c-wrapper" id="contact">
        <div className="c-container paddings innerWidth flexCenter">
            <div className="flexColStart c-left">
                <span className='primaryText'>Contact Us</span>
                <span className='secondaryText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed facere, dicta necessitatibus iste reiciendis aliquid iusto, nulla illo maiores dignissimos amet nobis quas voluptatem accusantium iure nemo. Possimus, labore quaerat!</span>
                
                <div className="flexColStart contactModes">
                    <div className="flexColCenter row">
                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <MdCall size={25}/>
                                </div>
                                <div className="flexColStart detail">
                                    <span className='primaryText'>Call</span>
                                    <span className='secondaryText'>+021 123 145 14</span>
                                </div>
                            </div>
                            <div className="flexCenter button">
                                Call now
                            </div>
                        </div>

                        <div className="flexCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <BsFillChatDotsFill size={25}/>
                                </div>
                                <div className="flexColStart detail">
                                    <span className='primaryText'>Chat</span>
                                    <span className='secondaryText'>+021 123 145 14</span>
                                </div>
                            </div>
                            <div className="flexCenter button">
                                Chat now
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flexCenter c-right ">
                <div className="image-container">
                    <img src="./hero-image.png" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact
