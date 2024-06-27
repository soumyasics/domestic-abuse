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
    <footer className='footer-custom'>
      <div className='container-fluid p-0'>
        <div className='row d-flex align-items-center justify-content-between'>
          <div className='col-auto d-flex align-items-center'>
            <Link className="navbar-brand me-2" to="/">
              <img src={brand} alt='brand' className='img-fluid' />
            </Link>
            <h1 className='ms-0'>
              <span className='text-white me-2'>Safe</span>
              <span className='theme-green'>Space</span>
            </h1>
          </div>
          <div className='col-auto text-white m-3'>
            <h5 className='fs-3'>Terms & Policies</h5>
            <ul className='list-group list-group-flush text-white bg-theme'>
              <li className='list-group-item bg-transparent border-0'>
                <Link className='text-white text-decoration-none' to='/'>Terms of Service</Link>
              </li>
              <li className='list-group-item bg-transparent border-0'>
                <Link className='text-white text-decoration-none' to='/'>Privacy Policy</Link>
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
          <div className='col-auto text-white m-3'>
            <div className='row'>
              <div className='col text-center m-5'>
                <p className='m-auto'>Keep in TOUCH</p>
              </div>
            </div>
            <div className='row'>
              <div className='col d-flex justify-content-center'>
                <span className='m-1 p-2'>
                  <img src={fb} alt="Facebook" className='rounded-circle img-fluid social-icon-custom' />
                </span>
                <span className='m-1 p-2'>
                  <img src={insta} alt="Instagram" className='rounded-circle img-fluid social-icon-custom' />
                </span>
                <span className='m-1 p-2'>
                  <img src={x} alt="X" className='rounded-circle img-fluid social-icon-custom' />
                </span>
                <span className='m-1 p-2'>
                  <img src={youtube} alt="YouTube" className='rounded-circle img-fluid social-icon-custom' />
                </span>
                <span className='m-1 p-2'>
                  <img src={linkedIn} alt="LinkedIn" className='rounded-circle img-fluid social-icon-custom' />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr className='hr-custom'/>
          </div>
        </div>
        <div className='row text-white fs-4 text-center'>
          <div className='col'>
            <p>copyright@2024</p>
          </div>
          <div className='col'>
            <p>All Rights Reserved-Safe Space for Domestic Abuse</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
