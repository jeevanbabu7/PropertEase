import React from 'react';
import './contact.css'; // Import your CSS file
import {MailOutline ,LocationCityOutlined} from '@mui/icons-material'
function ContactUs() {
    return (
        <section className='contact-container'>
            <div className="container">
                <div className="content">
                    <div className="left-side">
                        <div className="address details">
                            <LocationCityOutlined />
                            <div className="topic">Address</div>
                            <div className="text-one">Surkhet, NP12</div>
                            <div className="text-two">Birendranagar 06</div>
                        </div>
                        <div className="phone details">
                        <MailOutline />
                            <div className="topic">Phone</div>
                            <div className="text-one">+0098 9893 6547</div>
                            <div className="text-two">+0096 0584 7088</div>
                        </div>
                        <div className="email details">
                            {/* <FaEnvelope /> */}
                            <div className="topic">Email</div>
                            <div className="text-one">propertease@gmail.com</div>
                            <div className="text-two">info.propertease@gmail.com</div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="topic-text">Contact Us</div>
                        <p>If you have any type of queries feel free to contact us. It's our pleasure to help you.</p>
                        <form action="#">
                            <div className="input-box">
                                <input type="text" placeholder="Enter sender's email" required />
                            </div>
                            <div className="input-box">
                                <input type="email" placeholder="Enter recipient's email" required />
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Enter your name" required />
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Enter your phone number" required />
                            </div>
                            <div className="input-box message-box">
                                <textarea placeholder="Type your query..." required></textarea>
                            </div>
                            <div className="button">
                                <input type="submit" value="Submit" className='submit-btn'/>
                            </div>
                        </form>
                    </div>  
                </div>
            </div>
        </section>
    );
}

export default ContactUs;
