import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className='container-fluid font-poppins'>
        <div className='row m-5'>
            <div className='col'>
                <h3 className='theme-purple fw-semibold'>About Us</h3>
            </div>
        </div>
        <div className='row m-5'>
            <div className='col'>
                <h4>Our Mission</h4>
                <p className='theme-purple'>At Safe Space, our mission is to provide a safe, supportive, and confidential environment for individuals affected by domestic abuse. We strive to empower survivors through comprehensive services that promote healing, independence, and self-worth.</p>
            </div>
        </div>
        <div className='row m-5'>
            <div className='col'>
                <h4>Our Vision</h4>
                <p className='theme-purple'>We envision a world where everyone lives free from fear and violence, where survivors of domestic abuse are supported, and where the cycle of abuse is broken for future generations.</p>
            </div>
        </div>
        <div className='row m-5'>
            <div className='col'>
                <h4>What We Do</h4>
                <p className='theme-purple'>
                    <ul>
                        <li>Safe House: Immediate, safe housing for individuals and families in crisis.</li>
                        <li>Counseling Services: Professional therapy and support groups to help survivors process their experiences and start the healing journey.</li>
                        <li>Supporter Service: Guidance and support navigating the legal system, including restraining orders and custody issues.</li>
                        <li>Advocacy: Empowering survivors through advocacy and connecting them with resources for long-term safety and independence.</li>
                    </ul>
                </p>
            </div>
        </div>
        <div className='row m-5'>
            <div className='col'>
                <h4>Our Approach</h4>
                <p className='theme-purple'>We believe in a holistic approach to healing that addresses the emotional, physical, and practical needs of survivors. Our services are confidential, non-judgmental, and tailored to each individual's unique situation.</p>
            </div>
        </div>
        <div className='row m-5'>
            <div className='col'>
                <h4>Contact us</h4>
                <p className='theme-purple'>If you or someone you know is in immediate danger, please call 181 For more information about our services or to speak with a member of our team, please contact us at 123 4567 890.</p>
            </div>
        </div>
    </div>
  )
}

export default AboutUs