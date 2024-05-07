import React, { useState } from 'react';
import './contact.css'; // Import your CSS file
import { MailOutline, LocationCityOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

function ContactUs() {
    const [formData, setFormData] = useState({
        senderEmail: '',
        name: '',
        phoneNumber: '',
        query: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hii");
        const { senderEmail, name, phoneNumber, query } = formData;
        const subject = "New Contact Form Submission";
        const body = `Name: ${name}%0AEmail: ${senderEmail}%0APhone Number: ${phoneNumber}%0AQuery: ${query}`;
        const mailtoLink = `mailto:jeevanbabu190@gmail.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
    };

    return (
        <section className='contact-container'>
            <div className="container">
                <div className="content">
                    <div className="left-side">
                        {/* Address, phone, email details */}
                    </div>
                    <div className="right-side">
                        <div className="topic-text">Contact Us</div>
                        <p>If you have any type of queries feel free to contact us. It's our pleasure to help you.</p>
                        <form >
                            <div className="input-box">
                                <input type="email" name="senderEmail" placeholder="Enter sender's email" value={formData.senderEmail} onChange={handleChange} required />
                            </div>
                            <div className="input-box">
                                <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                            </div>
                            
                            <div className="input-box message-box">
                                <textarea name="query" placeholder="Type your query..." value={formData.query} onChange={handleChange} required></textarea>
                                
                            </div>
                            <div className="button">
                                <Button  onClick={handleSubmit} style={{color: 'white'}}>Send</Button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;
