import React from 'react';
import './contactHome.css';

const AboutUsPage = () => {
  return (
    <div className='main-wrapper'>
      <div className="preIntro">
        <h1>Welcome to PropertEase - The Ultimate Dwelling Planner</h1>
        <p>At PropertEase, we are dedicated to simplifying property management for homeowners, landlords, and tenants alike. Our platform is designed to streamline the complexities of property management, making it easier and more efficient to handle all aspects of your rental properties.</p>
      </div>

      <h2 style={{textAlign: 'center' , marginTop: "2rem"}}>Get Started today</h2>
      <hr />

      <div className="prePara">
        <p>PropertEase is a revolutionary tool that have transformed the way residential properties are managed and operated. These systems encompass a wide range of features and functionalities aimed at simplifying the complexities associated with overseeing rental properties, whether you're a property owner, landlord, or property manager. At the core of a house property management system lies its ability to streamline various tasks and processes involved in managing residential properties.</p>
        <br />
        <p>Modern house property management systems often come equipped with a range of additional features and capabilities designed to further enhance the user experience and improve overall operational efficiency. For example, many systems offer online portals for both landlords/property managers and tenants, allowing for convenient communication, document sharing, and access to important information anytime, anywhere.</p>
      </div>

      <div>
        <div className="preTitle">
          <h1>Our Services</h1>
          <hr />
        </div>
        <div className="preServices">
          <div className="preCard">
            <div className="preIcon">
              <i className="fas fa-calendar-days"></i>
            </div>
            <h2>Planning</h2>
            <p>Enhance strategic decision-making with our planning tools, designed to optimize rental property management. Forecast revenue, track expenses, manage tenant turnover, pay rent efficiently and schedule maintenance efficiently. Streamline operations and maximize profitability with data-driven insights tailored to your property portfolio.</p>
          </div>

          <div className="preCard">
            <div className="preIcon">
              <i className="fas fa-wrench"></i>
            </div>
            <h2>Maintenance</h2>
            <p>Streamline property maintenance with our advanced management system. Schedule and track repairs, coordinate with trusted service providers, and respond to tenant requests promptly. Our automated notifications ensure no task is overlooked, enhancing tenant satisfaction and extending the lifespan of your properties.</p>
          </div>

          <div className="preCard">
            <div className="preIcon">
              <i className="fas fa-handshake"></i>
            </div>
            <h2>Support</h2>
            <p>Our dedicated support team is available 24/7 to assist with any queries or issues you encounter. Whether it's technical support, user training, or system troubleshooting, we're here to ensure your property management experience is smooth and efficient. Reach out via phone, email, or live chat for immediate assistance.</p>
          </div>
        </div>
      </div>

      <h2 style={{textAlign: 'center' , marginTop: "2rem"}}>Why Choose Us?</h2>
      <hr />
      <br />
      <div className="preParagraph">
        <p>We offer tools and features that enable <img src="pic4.jpg" alt="" className="preImg3" />the financial performance of their rental properties. Maintenance management is also a key component of house property management systems.</p>
        <p>Facilitate the efficient coordination of maintenance and repair tasks, allowing property owners and managers to schedule and track maintenance activities, communicate with maintenance vendors, and address tenant maintenance requests promptly. By streamlining maintenance processes, property management systems help ensure that rental properties are well-maintained and that tenant satisfaction is maintained.</p>
        <p>A range of additional features and capabilities designed to further enhance the user experience and improve overall operational efficiency. and processes involved in managing residential properties. One of the primary functions is tenant management, which includes everything from screening potential tenants and managing leases to handling rent payments and addressing tenant inquiries and concerns. With the help of a property management system, landlords and property managers can automate many of these tasks, reducing manual workload and ensuring that all tenant-related processes are handled efficiently and accurately.</p>
      </div>

      <div className="preWrapper">
        <h2>Our Team</h2>
        <hr />
        <div className="preMembers">
          <div className="preTeamMem">
            <img src="image1.png" alt="" className="preImg1" />
            <h4>Jeevan</h4>
          </div>
          <div className="preTeamMem">
            <img src="image2.png" alt="" className="preImg1" />
            <h4>Aparna</h4>
          </div>
          <div className="preTeamMem">
            <img src="image3.png" alt="" className="preImg1" />
            <h4>Anto</h4>
          </div>
          <div className="preTeamMem">
            <img src="image4.png" alt="" className="preImg1" />
            <h4>Bhavya</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
