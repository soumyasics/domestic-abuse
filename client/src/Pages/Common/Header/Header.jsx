import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import HomeIcon from '../../../Assets/solar_home-broken.png'
function Header() {
  return (
    <div className='container-fluid bg-theme'>
      <nav className="navbar bg-theme">
        <div className="container-fluid d-flex justify-content-center">
          <img src={HomeIcon} className='m-3'/>
          <Link className="navbar-brand fw-bolder" to="#">SAFE SPACE FOR DOMESTIC ABUSE</Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
