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
    <footer className='footer h-100 bg-theme'>
      <div className='container-fluid p-0'>
        <div className='row d-flex  align-items-center justify-content-between'>
          <div className='col-auto d-flex align-items-center'>
            <Link className="navbar-brand me-2" to="/">
              <img src={brand} alt='brand' height={100} className='img-fluid' />
            </Link>
            <h1 className='navbar-brands align-self-center ms-0'>
              <span className='text-white me-2'>Safe</span>
              <span className='theme-green'>Space</span>
            </h1>
          </div>
          <div className='col-auto text-white m-3'>
            <h5 className='fs-3'>Terms & Policies</h5>
            <ul className='list-group list-group-flush text-white bg-theme'>
              <li className='list-group-item bg-theme border-0'>
                <Link className='text-white text-decoration-none' to={'/'}>Terms of Service</Link>
              </li>
              <li className='list-group-item bg-theme border-0'>
                <Link className='text-white text-decoration-none' to={''}>Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className='col-auto text-white m-3'>
            <h5 className='fs-3'>Contact</h5>
            <p>safespace@gmail.com</p>
            <p>Skype</p>
          </div>
          <div className='col-auto text-white m-3'>
            <h5 className='fs-3'>Location</h5>
            <p>HSHSGSDHSHDSHDH</p>
            <p>HSHSGSDHSHDSHDH</p>
            <p>HSHSGSDHSHDSHDH</p>
          </div>
          <div className='col-auto text-white m-3 '>
            <div className='row'>
              <div className='col text-center '>
                <p className=' m-auto'>Keep in TOUCH</p>
              </div>
            </div>
            <div className='row '>
              <div className='col'>
                <span className='m-1 p-2'>
                  <img src={fb} alt="Facebook" className='rounded-circle img-fluid social-icon' />
                </span>
                <span className='m-1 p-2'>
                  <img src={insta} alt="Instagram" className='rounded-circle img-fluid social-icon' />
                </span>
                <span className='m-1 p-2'>
                  <img src={x} alt="X" className='rounded-circle img-fluid social-icon' />
                </span>
                <span className='m-1 p-2'>
                  <img src={youtube} alt="YouTube" className='rounded-circle img-fluid social-icon' />
                </span>
                <span className='m-1 p-2'>
                  <img src={linkedIn} alt="LinkedIn" className='rounded-circle img-fluid social-icon' />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
