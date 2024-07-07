import React from 'react';
import './UserHome.css'
import hero from '../../../Assets/user-home.png';
import safehouse1 from '../../../Assets/ADMIN VIEW DETAILS.png';
import safehouse2 from '../../../Assets/safehouse.jpeg';
import safehouse3 from '../../../Assets/safehouse1.jpeg';
import cardImg1 from '../../../Assets/user-home-card1.png';
import cardImg2 from '../../../Assets/user-home-card2.png';
import cardImg3 from '../../../Assets/user-home-card3.png';


function UserHome() {
    return (
        <div className='container'>
            <div className='row m-5'>
                <div className='col d-flex m-auto'>
                    <img src={hero} alt='home-hero' className='img-fluid m-auto object-fit-cover w-100 h-100' />
                </div>
            </div>
            <div className='row m-5'>
                <div className='col text-center d-flex flex-column align-items-center justify-content-center'>
                    <h3 className='theme-purple m-5'>Come and Join Our Safe House</h3>
                    <p className='opacity-50'>Safe House is Securing Living Residence. We Support Our Users in their journey of Sobriety by Providing Comfortrable, Clean and affordable housing. Safe House creating a Supportive Community that promotes a health and happylife. Come and join our Safe House.</p>
                </div>
                <div className='col'>
                    <div className='row'>
                        <div className='col pe-0'>
                            <img src={safehouse1} alt='home-hero' className='img-fluid object-fit-cover h-100 w-100' />
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col ps-0'>
                                    <img src={safehouse2} alt='home-hero' className='img-fluid m-auto' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col ps-0'>
                                    <img src={safehouse3} alt='home-hero' className='img-fluid m-auto' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <h3 className='fw-medium theme-purple'>Identify Abuse</h3>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <div className='card h-100 '>
                        <img src={cardImg1} className='img-fluid card-image card-img-top bg-creamy' alt='card 1' />
                        <div className='card-body'>
                            <p className='card-text border rounded-bottom opacity-50'>
                                Safe House has been helping and supporting
                                domestic violence victims,Legal Professionals,
                                 Counselors,Supporters.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card h-100'>
                        <img src={cardImg2} className='img-fluid card-image card-img-top bg-creamy' alt='card 2' />
                        <div className='card-body'>
                            <p className='card-text border rounded-bottom opacity-50'>
                            It can include physical abuse and emotional abuse, but often, coercive control is more subtle.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card h-100'>
                        <img src={cardImg3} className='img-fluid card-image card-img-top bg-creamy' alt='card 3' />
                        <div className='card-body'>
                            <p className='card-text border rounded-bottom opacity-50'>
                            Most survivors of domestic violence will say that it was difficult to accept that they were being abused by a partner or family member
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col text-end m-5'>
                    <button className='btn bg-purple text-white rounded-4'>Add an Issue</button>
                </div>
            </div>
        </div>
    )
}

export default UserHome