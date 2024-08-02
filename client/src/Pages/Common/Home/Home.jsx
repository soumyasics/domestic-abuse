import React from 'react';
import './Home.css';
import safeHug from '../../../Assets/unnamed (2).png';

import { useNavigate } from 'react-router-dom';
import OurServices from '../OurServices/OurServices';
function  Home() {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='row m-5'>
                <div className='col theme-purple d-flex flex-column align-self-center m-4'>
                    <p className='fs-3 m-2'>Get Help</p>
                    <h1 className='fw-bold m-2'>Access discreet help and support whenever you need it.</h1>
                    <button className='btn bg-theme align-self-center text-white py-3 px-4 fw-bold m-5
                    ' onClick={()=>{navigate('/user-login')}}>Join With Us</button>
                </div>
                <div className='col m-4 text-white position-relative'>
                    <div>
                        <div className='home-sticky-box text-center p-3 position-absolute'>
                            <h3>2 Million+ Survivors</h3>
                            <p>helped each year</p>
                        </div>
                        <img src={safeHug} alt='Mother Hugging Child' className='img-fluid rounded' />
                    </div>
                </div>
            </div>
           <OurServices />
        </div>
    )
}

export default Home