import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import fb from '../../../Assets/pngegg.png';
import insta from '../../../Assets/pngegg (1).png';
import youtube from '../../../Assets/pngegg (2).png';
import gPlus from '../../../Assets/pngegg (3).png';
import x from '../../../Assets/transparent-x-logo-logo-brand-identity-company-organization-black-background-white-x-logo-for-company65aa10e7af4120.5751422617056442637179.png';

function Footer() {
  return (
    <div className='container-fluid footer-base m-0 p-0 bg-theme'>
      <div className=' m-5 '>
        <div className='row'>
          <div className='col'>
            <h4 className='my-3 p-2 fw-bolder'>Safe Space For Domestic Abuse</h4>
            <hr />
          </div>
        </div>
        <div className='row align-items-end'> 
          <div className='col-6 p-5 pb-0 d-flex'>
            <span className='m-1 p-2'>
              <img src={fb} alt="Facebook" className='rounded-circle' width={'50'} />
            </span>
            <span className='m-1 p-2'>
              <img src={insta} alt="Instagram" className='rounded-circle' width={'50'} />
            </span>
            <span className='m-1 p-2'>
              <img src={youtube} alt="YouTube" className='rounded-circle' width={'50'} />
            </span>
            <span className='m-1 p-2'>
              <img src={gPlus} alt="Google Plus" className='rounded-circle' width={'50'} />
            </span>
            <span className='m-1 p-2'>
              <img src={x} alt="X" className='rounded-circle' width={'50'} />
            </span>
          </div>
          <div className='col-6 d-flex  justify-content-end'>
            <div>
              <h5 className='fw-bolder'>Contact Us</h5>
              <div className="d-flex ">
                <input type="email" className="form-control form-control-lg border border-dark mr-2 " placeholder="Email address" />
                <button type="button" className="btn btn-light btn-lg ms-3">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr/>
          </div>
        </div>
        <div className='row bg-theme'>
          <div className='col '>
              <p className='m-0'>© 2020 - 2023 Srishti campus Inc.All rights reserved.</p>
          </div>
          <div className='col d-flex align-items-end ms-5 justify-content-end '>
          <Link className='text-decoration-none mx-3 text-dark' to=''>Terms of Service</Link>
          <Link className='text-decoration-none mx-3 text-dark' to=''>Privacy Policy</Link>
          <Link className='text-decoration-none mx-3 text-dark' to=''>Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
