import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import brand from '../../../Assets/2a75e2f413ad511cbebf7abc265805b4.png';
import fb from '../../../Assets/Facebook_Logo_2023.png';
import insta from '../../../Assets/Instagram_icon.png';
import youtube from '../../../Assets/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.webp';
import linkedIn from '../../../Assets/LinkedIn_logo_initials.png';
import x from '../../../Assets/transparent-x-logo-logo-brand-identity-company-organization-black-background-white-x-logo-for-company65aa10e7af4120.5751422617056442637179.png';

function Footer() {
  return (
    <>
      <footer class="footer bg-theme">
        <div class="container-fluid">
          <div class="row">
            <div class="col d-flex align-items-center justify-content-center">
              <Link className="navbar-brand me-2 text-center" to="#">
                <img src={brand} alt='brand' className='footer-img' />
              </Link>
              <h1 className='ms-0 '>
                <span className='text-white me-2 fs-3 fw-semibold'>Safe</span>
                <span className='theme-green fs-3 fw-semibold'>Space</span>
              </h1>
            </div>
            <div class="col">
              <h5 className='fs-5 fw-semibold'>Terms & Policies</h5>
              <ul className='list-group list-group-flush text-white bg-theme'>
                <li className='list-group-item bg-transparent border-0'>
                  <Link className='text-white text-decoration-none' to='#'>Terms of Service</Link>
                </li>
                <li className='list-group-item bg-transparent border-0'>
                  <Link className='text-white text-decoration-none' to='#'>Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div class="col">
              <h5 className='fs-5 fw-semibold'>Contact</h5>
              <p>safespace@gmail.com</p>
              <p>Skype</p>
            </div>
            <div class="col">
              <h5 className='fs-5  fw-semibold'>Important</h5>
              <p>If you are in immediate danger, please call 911. </p>
              <p>For confidential support</p>
              <p> call the National Domestic Violence Hotline at 1-500-719-7133.</p>
            </div>
            <div class="col d-flex flex-column justify-content-center align-items-center">
              <div className='row  '>
                <div className='col'>
                  <p className='m-auto fw-semibold '>Keep in TOUCH</p>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='row'>
                    <div className='col m-1  p-2'>
                      <Link to={'https://www.facebook.com/login/'} className='btn'>
                        <img src={fb} alt="Facebook" className='rounded-circle img-fluid social-icon-custom' />
                      </Link>
                    </div>
                    <div className='col m-1  p-2'>
                      <Link to={'https://www.instagram.com/accounts/login/?hl=en'} className='btn'>
                        <img src={insta} alt="Instagram" className='rounded-circle img-fluid social-icon-custom' />
                      </Link>
                    </div>
                    <div className='col m-1  p-2'>
                      <Link to={'https://x.com/?lang=en'} className='btn'>
                        <img src={x} alt="X" className='rounded-circle img-fluid social-icon-custom' />
                      </Link>
                    </div>
                    <div className='col m-1  p-2'>
                      <Link to={'https://www.youtube.com/'} className='btn'>
                        <img src={youtube} alt="YouTube" className='rounded-circle img-fluid social-icon-custom' />
                      </Link>
                    </div>
                    <div className='col m-1  p-2'>
                      <Link to={'https://in.linkedin.com/'} className='btn'>
                        <img src={linkedIn} alt="LinkedIn" className='rounded-circle img-fluid social-icon-custom' />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className='hr-custom' />
          <div class="row">
            <div class="col-md-6">
              <p></p>
            </div>
            <div class="col-md-6 text-end">
              <p>&copy;@2024 All Rights Reserved-Safe Space for Domestic Abuse</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
