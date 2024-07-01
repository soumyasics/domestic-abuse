import React from 'react';
import './CounsellorHome.css';
import girl from '../../../Assets/counsellor-home.png';
import victim1 from '../../../Assets/counsellor-home-1.png';
import victim2 from '../../../Assets/counsellor-home-2.jpeg';
import victim3 from '../../../Assets/counsellor-home-3.png';
import { FaRegThumbsUp, FaComments } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
function CounsellorHome() {
  return (
    <div className='container-xxl'>
      <div className='row bg-creamy m-auto'>
        <div className='col-md-7 '>
          <div className='row m-5 mb-0'>
            <div className='col'>
              <h2 className='theme-purple fw-bolder'>Empowering Change, One Conversation at a Time</h2>
            </div>
          </div>
          <div className='row m-5 mb-0'>
            <div className='col'>
              <p className='text-secondary fs-5'>Your dedication and support make a difference every day. Let’s create a safe and empowering environment together.</p>
            </div>
          </div>
          <div className='row m-5'>
            <div className='col ms-5'>
              <button className='btn bg-purple text-white px-5'>Check Appointments</button>
            </div>
          </div>
        </div>
        <div className='col-md-5 '>
          <img src={girl} className='img-fluid m-5' alt='girl' />
        </div>

      </div>
      <div className='row'>
        <div className='col'>
          <div className='row m-5'>
            <div className='col d-flex align-items-center'>
              <img src={victim1} className='img-fluid m-1' alt='girl' />

            </div>
            <div className='col'>
              <div className='row'>
                <div className='col'>
                  <img src={victim2} className='img-fluid m-2' alt='girl' />

                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <img src={victim3} className='img-fluid m-2' alt='girl' />

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col m-auto'>
          <div className='row m-5 '>
            <div className='col'>
              <h3 className='theme-purple fw-bolder fs-4'>Empowering Change, One Conversation at a Time</h3>
            </div>
          </div>
          <div className='row fs-6 text-secondary m-3'>
            <div className='col'>
              <p>We believe in the power of compassionate conversation and dedicated support. As a counselor, your role is crucial in guiding individuals through their challenges, offering them the strength and resilience they need to overcome adversity. Our platform is designed to facilitate seamless interactions between you and the users, providing you with the tools necessary to make a meaningful impact. </p>
            </div>
          </div>
          <div className='row fs-6 text-secondary m-3'>
            <div className='col'>
              <p>Whether it's scheduling appointments, reviewing user histories, or offering tailored advice, everything you need is at your fingertips.We are committed to fostering a safe, supportive, and empowering environment for all members of our community. Together, we can create a network of care and understanding that transcends barriers, bringing hope and healing to those who need it most. </p>
            </div>
          </div>
          <div className='row fs-6 text-secondary m-3'>
            <div className='col'>
              <p>Thank you for being an essential part of this journey. Your expertise, empathy, and dedication are the cornerstones of our mission to build a better, more compassionate world.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row m-5 bg-creamy rounded'>
        <div className='col-auto m-auto'>
          <div className="card text-white counsellor-home-card m-5" style={{ width: '16rem' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <FaRegThumbsUp className="me-2" size={25} />
                <h5 className="card-title mb-0">Motivation & Inspiration</h5>
              </div>
              <div className="row">
                <div className="col">
                  <p className="card-text">
                    Motivation & Inspiration: Read inspiring stories and quotes from our community. Your work changes lives every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-auto m-auto'>
          <div className="card text-white counsellor-home-card m-5" style={{ width: '16rem' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <FaPeopleGroup  className="me-2" size={25} />
                <h5 className="card-title mb-0">Community Insights</h5>
              </div>
              <div className="row">
                <div className="col">
                  <p className="card-text">
                    Community Insights: Gain valuable insights from community trends and reports. Your contribution is vital to our collective success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-auto m-auto'>
          <div className="card text-white counsellor-home-card m-5" style={{ width: '16rem' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <FaComments className="me-2" size={25} />
                <h5 className="card-title mb-0">User Interactions</h5>
              </div>
              <div className="row">
                <div className="col">
                  <p className="card-text">
                   User Interactions: Check out new messages and updates from users seeking your expertise. Respond promptly to support them effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CounsellorHome