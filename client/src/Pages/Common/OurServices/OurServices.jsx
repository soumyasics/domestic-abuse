import React from 'react';
import './OurServices.css';
import { useNavigate,useLocation } from 'react-router-dom';
import guide from '../../../Assets/img 3.png';
import thinking from '../../../Assets/img 4.png';
import water from '../../../Assets/img2.png';
import working from '../../../Assets/IMG 5.png';
import location1 from '../../../Assets/IMG6.png';

function OurServices() {
    const navigate= useNavigate();
    const location = useLocation();
  return (
    <div className='container-fluid my-5'>
        {
        location.pathname === '/services' && ( <div className='row m-5'>
            <div className='col'>
                <h4 className='theme-purple fw-semibold'>Our Services</h4>
            </div>
        </div>)
        }
        
         <div className='row m-5'>
                <div className='col '>
                    <div className='card h-100 theme-purple'>
                        <img src={water} className="card-img-top px-5 pt-4 mb-4" alt="water" />
                        <div className="card-body d-flex flex-column align-items-center">
                            <h5 class="card-title fw-semibold">Heal</h5>
                            <p className="card-text px-5">Find support,tools and inspiration to help you thrive after abuse.Explore resources on healing and recovery</p>
                            <button className='btn bg-theme text-white py-3 px-4 fw-bold mt-2' onClick={()=>{navigate('/user-login')}}>Find Suggestions</button>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card h-100 theme-purple'>
                        <img src={guide} className="card-img-top px-5 pt-4 mb-2" alt="guide" />
                        <div className="card-body d-flex flex-column align-items-center">
                            <h5 class="card-title fw-semibold">Get Help</h5>
                            <p className="card-text px-5">Find domestic violence shelters, programs and hotlines based on location,services and language. Explore helpful information on escaping.</p>
                            <button className='btn bg-theme text-white py-3 px-4 fw-bold mt-2 ' onClick={()=>{navigate('/user-login')}}>Find Counsellors</button>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card h-100 theme-purple'>
                        <img src={thinking} className="card-img-top px-5 pt-4 mb-2" alt="thinking" />
                        <div className="card-body d-flex flex-column align-items-center">
                            <h5 class="card-title fw-semibold">Identify Abuse</h5>
                            <p className="card-text px-5">Learn about domestic violence with statistics, expert insights and stories of survival. Explore resources on recognizing if you're experiencing abuse.</p>
                            <button className='btn bg-theme text-white py-3 px-4 fw-bold mt-1 ' onClick={()=>{navigate('/user-login')}}>Find Supporters</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>
                    <div className='card home-card-bg pb-5'>
                        <div className='row'>
                            <div className='col'>
                                <div className='card-body d-flex flex-column align-items-center theme-purple'>
                                    <div className='fw-bold card-title fs-5 my-5'>
                                        For Legal Professionals
                                    </div>
                                    <p className="card-text mb-5 mx-3">Better serve your clients with our free tools and resources.</p>
                                    <button className='btn bg-theme text-white px-5 py-3 fw-bold mt-3' onClick={()=>{navigate('/user-login')}}>See Resources</button>
                                </div>
                            </div>
                            <div className='col'>
                                <img src={working} className="card-img-top" alt="thinking" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card home-card-bg pb-5'>
                        <div className='row'>
                            <div className='col'>
                                <div className='card-body d-flex flex-column align-items-center theme-purple'>
                                    <div className='fw-bold card-title fs-5 my-5'>
                                        Claim Your Safe House
                                    </div>
                                    <p className="card-text mb-5 mx-3">Claim and manage your safe house information</p>
                                    <button className='btn bg-theme text-white px-5 py-3 mt-3 fw-bold' onClick={()=>{navigate('/user-login')}}>Get Started</button>
                                </div>
                            </div>
                            <div className='col'>
                                <img src={location1} className="card-img-top" alt="thinking" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default OurServices