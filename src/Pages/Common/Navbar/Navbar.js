import React from 'react';
import './Navbar.css';
import brand from '../../../Assets/Frame 10.png';
import user_img from '../../../Assets/Ellipse 4.png'
function Navbar() {
  return (
    <div className='container-fluid'>
        <nav className="navbar navbar-expand-lg  bg-primary-custom " id='navbar-linked'>
        
        <a className="navbar-brand  mx-5" href="#"><img src={brand} alt='user'/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-5 justify-content-end" id="navbarNav1">
            <ul className="navbar-nav ml-auto mx-5 ">
                <li className="nav-item active">
                    <a className="nav-link  mx-3" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link  mx-3" href="#">About Us</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link  mx-3" href="#">Gallery</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link  mx-3" href="#">Jobs</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link  mx-3" href="#">Contact Us</a>
                </li>
                <li className='nav-item btn-group mx-3'>
                    <button type="button" className="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <img src={user_img} alt='user'/>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item nav-link text-dark" href="#">Action</a></li>
                        <li><a className="dropdown-item nav-link text-dark" href="#">Another action</a></li>
                        <li><a className="dropdown-item nav-link text-dark" href="#">Something else here</a></li>
                    </ul>
                
                </li>
                
            </ul>
        </div>
    </nav>
    </div>
  )
}

export default Navbar