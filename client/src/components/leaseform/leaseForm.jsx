import React, { useEffect, useState } from 'react';
import './leaseForm.css'
import { tokens } from '../../utils/theme';
import { useTheme } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dashboard } from '@mui/icons-material';


const LeaseRequestForm = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const params = useParams();
    const propertyId = params.id;
    const [propertyData,setPropertyData] = useState({})
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: 'Male', // Default value for gender
        occupation: '',
        address: '',
        cityDistrict: '',
        country: '',
        pincode: '',
        residents: '',
        otherRequests: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const message = `
            
            <h2>Form Data</h2>
            <p><strong>Full Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
            <p><strong>Date of Birth:</strong> ${formData.dateOfBirth}</p>
            <p><strong>Gender:</strong> ${formData.gender}</p>
            <p><strong>Occupation:</strong> ${formData.occupation}</p>
            <p><strong>Address:</strong> ${formData.address}</p>
            <p><strong>City/District:</strong> ${formData.cityDistrict}</p>
            <p><strong>Country:</strong> ${formData.country}</p>
            <p><strong>Pincode:</strong> ${formData.pincode}</p>
            <p><strong>Residents:</strong> ${formData.residents}</p>
            <p><strong>Other Requests:</strong> ${formData.otherRequests}</p>
        `;
 
        const reqData = {
            ownerId: propertyData.userRef ,
            tenantId: currentUser._id ,
            tenantName: formData.fullName ,
            propertyId: propertyData._id ,
            propertyName: propertyData.name ,
            message: message 
        }
    
        try {
            const req = await fetch(`/api/request/rent`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)

            })
            
            const res = await req.json();
           
            if(res.success == false) {
                console.log("error");
                return;
            }
            navigate('/dashboard/lease-requests');
        }catch(err) {
            next(err)
        }
        
        

    };

    console.log(formData);

    useEffect(() => {

        const fetchPropertyDetails = async () => {
            try {
                const property =await fetch(`/api/listing/property/${propertyId}`,{
                    method: 'GET'
                });
    
                const propertyDetails = await property.json();
                setPropertyData(propertyDetails);
            }catch(err) {
                next(err);
            }
        }
        fetchPropertyDetails()
    },[])
    return (

        <section className='req-wrapper'
            sx={{
                color: colors.primary[100]
            }}
        >
            <div className="container1" 
                style={{
                    backgroundColor: colors.primary[400]
                }}
            >
                <header style={{color:colors.blueAccent[100]}}>Property Request form</header>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-box">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" placeholder="Enter Full Name" required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Enter Email Address" required onChange={handleChange} />
                    </div>

                    <div className="column">
                        <div className="input-box">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="number" id="phoneNumber" placeholder="Enter Phone Number" required onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="dateOfBirth">Date Of Birth</label>
                            <input type="date" id="dateOfBirth" placeholder="Enter Date of Birth" required onChange={handleChange} />
                        </div> 
                    </div>
                    <div className="gender-box">
                        <h3>Gender</h3>
                        <div className="gender-option">
                            <div className="gender">
                                <input type="radio" id="check-male" name="gender" defaultChecked onChange={handleChange} />
                                <label htmlFor="check-male">Male</label>
                            </div>
                            <div className="gender">
                                <input type="radio" id="check-female" name="gender" onChange={handleChange} />
                                <label htmlFor="check-female">Female</label>
                            </div>
                            <div className="gender">
                                <input type="radio" id="check-other" name="gender" onChange={handleChange} />
                                <label htmlFor="check-other">Prefer not to say</label>
                            </div>
                        </div>
                    </div>

                    <div className="input-box">
                        <label htmlFor="occupation">Occupation</label>
                        <input type="text" id="occupation" placeholder="Occupation" required onChange={handleChange} />
                    </div> 

                    <div className="input-box">
                        <label>Address</label>
                        <input type="text" id='address' placeholder="Enter Address" required onChange={handleChange} />
                        <input type="text" id='cityDistrict' placeholder="Enter your City/District" required onChange={handleChange} />
                        <div className="column">
                            <input type="text" id='country' placeholder="Enter your Country" required onChange={handleChange} />
                            <input type="number" id='pincode' placeholder="Enter pincode" required onChange={handleChange} />
                        </div>
                    </div> 

                    <div className="input-box">
                        <label htmlFor="residents">Number of residents expected</label>
                        <input type="number" id="residents" placeholder="Enter number of residents expected" required onChange={handleChange} />
                    </div> 

                    <div className="input-box">
                        <label htmlFor="otherRequests">Message: </label>
                        <textarea id="message" placeholder="Enter other requests/suggestions" onChange={handleChange}></textarea>
                    </div> 

                    <button type="submit" style={{}}>Submit</button>
                </form>
            </div>
        </section>
    );
}

export default LeaseRequestForm;
